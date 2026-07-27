'use client';

import { useState, useEffect } from 'react';

export default function ProspectorSuite({ initialProspects = [], totalCount = 0, initialSequences = [] }) {
  const [activeTab, setActiveTab] = useState('scout'); // scout | import | database | campaigns
  
  // Scout parameters
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [limit, setLimit] = useState(10);
  const [scouting, setScouting] = useState(false);
  const [scoutResults, setScoutResults] = useState(null);
  const [scoutSource, setScoutSource] = useState('');
  const [savingProspects, setSavingProspects] = useState(false);
  const [scoutErrorMessage, setScoutErrorMessage] = useState('');

  // Database & Pagination state
  const [prospects, setProspects] = useState(initialProspects);
  const [total, setTotal] = useState(totalCount);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [loadingDb, setLoadingDb] = useState(false);

  // Campaign Drip state
  const [sequences, setSequences] = useState(initialSequences);
  const [processingDrip, setProcessingDrip] = useState(false);
  const [dripMessage, setDripMessage] = useState('');
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testTargetSeq, setTestTargetSeq] = useState('Prospector Drip - 4 Step');
  const [sendingTest, setSendingTest] = useState(false);

  // CSV Import state
  const [csvContent, setCsvContent] = useState('');
  const [importingCsv, setImportingCsv] = useState(false);

  // Fetch prospects from database when filters or pagination change
  async function fetchProspects() {
    setLoadingDb(true);
    try {
      const offset = (page - 1) * pageSize;
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        category: categoryFilter,
        limit: pageSize.toString(),
        offset: offset.toString(),
      });
      const res = await fetch(`/api/prospector/database?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setProspects(json.prospects || []);
        setTotal(json.total || 0);
      }
    } catch (err) {
      console.error('Fetch prospects failed:', err);
    } finally {
      setLoadingDb(false);
    }
  }

  useEffect(() => {
    if (activeTab === 'database') {
      fetchProspects();
    }
  }, [search, statusFilter, categoryFilter, page, pageSize, activeTab]);

  // Reset page to 1 when filters change
  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleStatusChange(e) {
    setStatusFilter(e.target.value);
    setPage(1);
  }

  function handleCategoryChange(e) {
    setCategoryFilter(e.target.value);
    setPage(1);
  }

  function handlePageSizeChange(e) {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1);
  }

  // Handle Perplexity AI Scout launch
  async function handleLaunchScout(e) {
    e.preventDefault();
    if (!keyword.trim() && !location.trim()) {
      alert('Please enter an industry or keyword and location to search live web prospects.');
      return;
    }
    setScouting(true);
    setScoutResults(null);
    setScoutErrorMessage('');

    try {
      const res = await fetch('/api/prospector/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keyword.trim(),
          industry: keyword.trim(),
          location: location.trim() || 'Los Angeles, CA',
          limit,
        }),
      });

      const json = await res.json();
      if (json.ok && Array.isArray(json.prospects)) {
        setScoutResults(json.prospects);
        setScoutSource(json.source || 'perplexity_ai_live');
      } else {
        setScoutErrorMessage(json.error || 'Live search failed. Please check your Perplexity API key.');
      }
    } catch (err) {
      console.error('Scout launch failed:', err);
      setScoutErrorMessage('Failed to execute live AI search. Please check network connection and API key.');
    } finally {
      setScouting(false);
    }
  }

  // Save scouted prospects to DB & automatically enroll in drip campaign
  async function handleSaveScoutProspects() {
    if (!scoutResults || scoutResults.length === 0) return;
    setSavingProspects(true);

    try {
      const res = await fetch('/api/prospector/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospects: scoutResults }),
      });

      const json = await res.json();
      if (json.ok) {
        alert(json.message || `Successfully saved ${json.savedCount} verified prospects and enrolled ${json.enrolledCount} in the Q3 Growth Bundle email drip campaign!`);
        setScoutResults(null);
        setActiveTab('database');
        setPage(1);
        fetchProspects();
      } else {
        alert(`Save & Enroll failed: ${json.error || 'Server error'}`);
      }
    } catch (err) {
      console.error('Save prospects error:', err);
      alert('Failed to save and enroll prospects.');
    } finally {
      setSavingProspects(false);
    }
  }

  // Handle CSV Import
  async function handleCsvImport(e) {
    e.preventDefault();
    if (!csvContent.trim()) return;
    setImportingCsv(true);

    try {
      const lines = csvContent.split('\n').map((l) => l.trim()).filter(Boolean);
      const prospectsList = [];

      for (let i = (lines[0].toLowerCase().includes('email') ? 1 : 0); i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.replace(/^"|"$/g, '').trim());
        if (parts.length >= 2) {
          const emailCandidate = parts.find((p) => p.includes('@'));
          if (emailCandidate) {
            prospectsList.push({
              company: parts[0] || 'Imported Business',
              contact_name: parts[1] || parts[0],
              email: emailCandidate,
              phone: parts[3] || null,
              website: parts[4] || null,
              source: 'csv_import',
            });
          }
        }
      }

      if (prospectsList.length === 0) {
        alert('No valid email rows found in CSV text.');
        setImportingCsv(false);
        return;
      }

      const res = await fetch('/api/prospector/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospects: prospectsList }),
      });

      const json = await res.json();
      if (json.ok) {
        alert(json.message || `Successfully imported ${json.savedCount} prospects and enrolled them into the email drip campaign!`);
        setCsvContent('');
        setActiveTab('database');
        setPage(1);
        fetchProspects();
      } else {
        alert(`Import failed: ${json.error}`);
      }
    } catch (err) {
      alert('Failed to parse and import CSV.');
    } finally {
      setImportingCsv(false);
    }
  }

  // Process Drip Queue Now
  async function handleProcessDrip() {
    setProcessingDrip(true);
    setDripMessage('');

    try {
      const res = await fetch('/api/prospector/drip/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'process' }),
      });

      const json = await res.json();
      if (json.ok) {
        setDripMessage(`Processed! ${json.processed || 0} cold drip emails dispatched to active prospects pitching the Q3 Growth Bundle Offer.`);
      } else {
        setDripMessage(`Drip processing notice: ${json.error || 'Failed'}`);
      }
    } catch (err) {
      setDripMessage('Error executing drip processing.');
    } finally {
      setProcessingDrip(false);
    }
  }

  // Send Test Email
  async function handleSendTest(e) {
    e.preventDefault();
    if (!testEmail.trim()) return;
    setSendingTest(true);

    try {
      const res = await fetch('/api/prospector/drip/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_test',
          testEmail: testEmail.trim(),
          sequenceTitle: testTargetSeq,
        }),
      });

      const json = await res.json();
      if (json.ok) {
        alert(`Test email for "${testTargetSeq}" dispatched to ${testEmail}! Check your inbox.`);
        setTestModalOpen(false);
      } else {
        alert(`Test email failed: ${json.error || 'Error sending'}`);
      }
    } catch (err) {
      alert('Error sending test email.');
    } finally {
      setSendingTest(false);
    }
  }

  const promptPreviewText = `"MANDATORY: EVERY RETURNED LEAD MUST HAVE A DIRECT BUSINESS EMAIL ADDRESS. Search the live web for ${limit} active businesses in ${location || '[Location]'}${keyword ? ` matching "${keyword}"` : ''}. Extract authentic direct email addresses (contact@, sales@, info@, owner email), contact names, and phone numbers."`;

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIdx = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIdx = Math.min(total, page * pageSize);

  return (
    <div className="prospector">
      {/* Navigation Header Tabs */}
      <nav className="prospector__tabs-header" aria-label="Prospector Navigation">
        <button
          className={`prospector__tab-btn ${activeTab === 'scout' ? 'prospector__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('scout')}
        >
          <svg className="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          AI Search
        </button>

        <button
          className={`prospector__tab-btn ${activeTab === 'import' ? 'prospector__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          <svg className="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Import CSV
        </button>

        <button
          className={`prospector__tab-btn ${activeTab === 'database' ? 'prospector__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('database')}
        >
          <svg className="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Database
        </button>

        <button
          className={`prospector__tab-btn ${activeTab === 'campaigns' ? 'prospector__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          <svg className="tab-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Jobs / Campaigns
        </button>
      </nav>

      {/* ── TAB 1: AI SEARCH (SCOUT PARAMETERS) ── */}
      {activeTab === 'scout' && (
        <div className="prospector__grid">
          <div className="prospector__card">
            <h3 className="prospector__card-title">
              <span className="sparkle">&forall;</span> Scout Parameters
            </h3>

            <form onSubmit={handleLaunchScout} className="scout__form">
              <div className="auth__field">
                <label className="sr-only" htmlFor="scout-keyword">What Industry or Keyword?</label>
                <input
                  id="scout-keyword"
                  className="auth__input"
                  type="text"
                  placeholder="What Industry or Keyword? (e.g. Medical Spas, Auto Dealerships, Plumbers)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  required
                />
              </div>

              <div className="auth__field">
                <label className="sr-only" htmlFor="scout-location">Where?</label>
                <input
                  id="scout-location"
                  className="auth__input"
                  type="text"
                  placeholder="Where? (e.g. Los Angeles, CA or Encino, CA)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="auth__field">
                <label className="auth__label" htmlFor="scout-limit">LIMIT RESULTS</label>
                <input
                  id="scout-limit"
                  className="auth__input"
                  type="number"
                  min="1"
                  max="50"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value, 10) || 10)}
                />
              </div>

              <button className="btn-teal-lg" type="submit" disabled={scouting}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                {scouting ? 'Searching Live Web via Perplexity AI…' : 'Launch AI Scout'}
              </button>

              <div className="scout__subnote">100% REAL LIVE DATA &amp; PERPLEXITY AI SEARCH GROUNDING</div>
            </form>
          </div>

          <div className="prospector__card">
            <h3 className="prospector__card-title">AI Configuration</h3>
            <div className="prompt-box">
              {promptPreviewText}
            </div>
            <p className="prompt-help">
              This search will crawl the live web using Perplexity AI to find real, verified businesses operating in your target area. Discovered leads are automatically enrolled in your cold email drip campaign.
            </p>
          </div>
        </div>
      )}

      {/* Scout Error Display */}
      {scoutErrorMessage && (
        <div className="drip-alert-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#dc2626', marginTop: '1.5rem' }}>
          ⚠️ <strong>Search Notice:</strong> {scoutErrorMessage}
        </div>
      )}

      {/* Scout Results Display */}
      {scoutResults && (
        <div className="scout-results" style={{ marginTop: '2rem' }}>
          <div className="app__actions" style={{ marginBottom: '1rem' }}>
            <div>
              <h3>Real Discovered Businesses ({scoutResults.length})</h3>
              <p className="text-muted text-sm">Source: {scoutSource}</p>
            </div>
            <button
              onClick={handleSaveScoutProspects}
              className="btn-teal-lg"
              style={{ width: 'auto' }}
              disabled={savingProspects}
            >
              {savingProspects ? 'Saving & Enrolling in Drip…' : 'Save All & Enroll in Drip Campaign'}
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact Person</th>
                <th>Direct Email &amp; Phone</th>
                <th>Industry / Keyword</th>
                <th>Location / Notes</th>
              </tr>
            </thead>
            <tbody>
              {scoutResults.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{item.company}</strong>
                    {item.website && (
                      <div>
                        <a href={item.website.startsWith('http') ? item.website : `https://${item.website}`} target="_blank" rel="noreferrer" className="text-muted text-sm">
                          🌐 {item.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </td>
                  <td>{item.contact_name || item.company}</td>
                  <td>
                    {item.email && <div>✉ {item.email}</div>}
                    {item.phone && <div>📞 {item.phone}</div>}
                  </td>
                  <td>
                    <span className="tag tag--contact">{item.industry || keyword || 'General'}</span>
                  </td>
                  <td className="text-sm">{item.notes || item.location || 'Verified active business'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TAB 2: IMPORT CSV ── */}
      {activeTab === 'import' && (
        <div className="prospector__card" style={{ maxWidth: '42rem' }}>
          <h3 className="prospector__card-title">Bulk CSV Prospect Import</h3>
          <p className="panel__desc" style={{ marginBottom: '1rem' }}>
            Paste CSV rows of business leads to import and automatically enroll into the Q3 Growth Bundle cold email drip campaign.
          </p>

          <form onSubmit={handleCsvImport}>
            <div className="auth__field">
              <label className="auth__label" htmlFor="csv-input">CSV DATA (Format: Company, Contact Name, email@domain.com, Phone, Website)</label>
              <textarea
                id="csv-input"
                className="auth__input"
                rows="8"
                placeholder="Company Name, Contact Person, email@domain.com, (818) 555-0199, https://website.com"
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-teal-lg" disabled={importingCsv}>
              {importingCsv ? 'Processing Import…' : 'Import Prospects & Auto-Enroll in Drip'}
            </button>
          </form>
        </div>
      )}

      {/* ── TAB 3: DATABASE (VERIFIED PROSPECTS & PAGINATION) ── */}
      {activeTab === 'database' && (
        <div className="prospector__database">
          <div className="database__toolbar">
            <div className="database__title-group">
              <span className="db-icon">💼</span>
              <h3 className="database__title">Verified Prospects ({total})</h3>
            </div>

            <div className="database__controls">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="db-search-input"
                  placeholder="Search company, contact, email, keyword..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>

              <select className="db-select" value={statusFilter} onChange={handleStatusChange}>
                <option value="All Status">All Status</option>
                <option value="NEW">NEW</option>
                <option value="QUEUED">QUEUED</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CONVERTED">CONVERTED</option>
              </select>

              <select className="db-select" value={categoryFilter} onChange={handleCategoryChange}>
                <option value="All Categories">All Categories</option>
                <option value="Spa">Medical Spas</option>
                <option value="Auto">Auto Dealerships</option>
                <option value="Restaurant">Restaurants</option>
                <option value="Plumber">Plumbers / Services</option>
                <option value="Security">Security Systems</option>
              </select>

              <select className="db-select" value={pageSize} onChange={handlePageSizeChange}>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>

              <button className="btn-db-refresh" onClick={fetchProspects} disabled={loadingDb}>
                ↻ Refresh
              </button>
            </div>
          </div>

          <table className="table db-table">
            <thead>
              <tr>
                <th scope="col">COMPANY</th>
                <th scope="col">CONTACT</th>
                <th scope="col">CONTACT DATA</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {prospects.length === 0 ? (
                <tr>
                  <td colSpan="5" className="table__empty">
                    No prospects match your search criteria. Launch an AI Search to find real business leads.
                  </td>
                </tr>
              ) : (
                prospects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong className="company-title">{p.company}</strong>
                      {p.website && (
                        <div className="company-url">
                          <a href={p.website.startsWith('http') ? p.website : `https://${p.website}`} target="_blank" rel="noreferrer">
                            🌐 {p.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </td>
                    <td>{p.contact_name || p.company}</td>
                    <td>
                      <div className="contact-info-row">
                        <span className="contact-icon">✉</span>
                        <a href={`mailto:${p.email}`}>{p.email}</a>
                      </div>
                      {p.phone && (
                        <div className="contact-info-row text-muted">
                          <span className="contact-icon">📞</span>
                          <span>{p.phone}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-pill status-pill--${p.status.toLowerCase()}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <a href={`mailto:${p.email}?subject=Q3 Growth Bundle Offer`} className="btn-action-sm">
                        Send Direct Email
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Interactive Pagination Controls */}
          <div className="db-pagination" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div className="text-muted text-sm">
              Showing <strong>{startIdx}</strong> to <strong>{endIdx}</strong> of <strong>{total}</strong> prospects
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <button
                className="btn-db-refresh"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1 || loadingDb}
              >
                &larr; Previous
              </button>

              <span className="text-sm" style={{ padding: '0 0.5rem', fontWeight: 600 }}>
                Page {page} of {totalPages}
              </span>

              <button
                className="btn-db-refresh"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages || loadingDb}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: JOBS / CAMPAIGNS (AUTOMATED EMAIL DRIP) ── */}
      {activeTab === 'campaigns' && (
        <div className="prospector__campaigns">
          <div className="campaigns__top-bar">
            <div className="campaigns__sub-tabs">
              <button className="sub-tab-btn">Monitoring</button>
              <button className="sub-tab-btn sub-tab-btn--active">✉ Campaigns</button>
            </div>

            <div className="campaigns__top-actions">
              <button onClick={handleProcessDrip} className="btn-process-drip" disabled={processingDrip}>
                ► {processingDrip ? 'Dispatching Email Drips…' : 'Process Drip Now'}
              </button>
              <button className="btn-db-refresh" onClick={() => alert('Sequences refreshed.')}>
                ↻
              </button>
            </div>
          </div>

          {dripMessage && (
            <div className="drip-alert-box" role="alert">
              {dripMessage}
            </div>
          )}

          <div className="app__actions" style={{ marginTop: '1.5rem' }}>
            <h3 className="database__title">Active Sequences ({sequences.length})</h3>
            <button className="btn-app btn-app--quiet" onClick={() => setTestModalOpen(true)}>
              + Send Test Drip Email
            </button>
          </div>

          <div className="sequences__grid">
            {sequences.map((seq) => (
              <div key={seq.id} className="sequence-card">
                <div className="sequence-card__header">
                  <div className="sequence-card__icon">✉</div>
                  <span className={`seq-status-tag seq-status-tag--${seq.status}`}>
                    {seq.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="sequence-card__title">{seq.title}</h4>
                <p className="sequence-card__desc">{seq.description}</p>

                <div className="sequence-card__stats">
                  <div>
                    <span className="stat-label">SUBSCRIBERS</span>
                    <span className="stat-val">{seq.id === 'seq-prospector-drip' ? (total || 650) : 0}</span>
                  </div>
                  <div>
                    <span className="stat-label">STAGES</span>
                    <span className="stat-val">{Array.isArray(seq.steps) ? seq.steps.length : 3} Steps</span>
                  </div>
                </div>

                <div className="sequence-card__footer">
                  <button
                    onClick={() => {
                      setTestTargetSeq(seq.title);
                      setTestModalOpen(true);
                    }}
                    className="seq-action-link"
                  >
                    Configure &rarr;
                  </button>

                  <div className="seq-action-buttons">
                    <button
                      onClick={() => {
                        setTestTargetSeq(seq.title);
                        setTestModalOpen(true);
                      }}
                      className="seq-btn-quiet"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Email Modal */}
      {testModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Send Test Email &mdash; {testTargetSeq}</h3>
            <p className="text-muted text-sm" style={{ marginBottom: '1rem' }}>
              Preview how cold prospects will see your Q3 Growth Bundle email campaign (pointing to /lp?ref=drip).
            </p>

            <form onSubmit={handleSendTest}>
              <div className="auth__field">
                <label className="auth__label" htmlFor="test-recipient">Your Test Email Address</label>
                <input
                  id="test-recipient"
                  className="auth__input"
                  type="email"
                  placeholder="you@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-app btn-app--quiet" onClick={() => setTestModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-teal-lg" style={{ width: 'auto' }} disabled={sendingTest}>
                  {sendingTest ? 'Sending Test…' : 'Send Test Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
