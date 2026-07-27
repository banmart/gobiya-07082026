'use client';

import { useState, useEffect } from 'react';

export default function ProspectorSuite({ initialProspects = [], totalCount = 0, initialSequences = [] }) {
  const [activeTab, setActiveTab] = useState('scout'); // scout | import | database | campaigns
  
  // Scout parameters
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [limit, setLimit] = useState(10);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [scouting, setScouting] = useState(false);
  const [scoutResults, setScoutResults] = useState(null);

  // Database state
  const [prospects, setProspects] = useState(initialProspects);
  const [total, setTotal] = useState(totalCount);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [pageSize, setPageSize] = useState(25);
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

  // Fetch prospects from database when filters change
  async function fetchProspects() {
    setLoadingDb(true);
    try {
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        category: categoryFilter,
        limit: pageSize.toString(),
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
  }, [search, statusFilter, categoryFilter, pageSize, activeTab]);

  // Handle Perplexity AI Scout launch
  async function handleLaunchScout(e) {
    e.preventDefault();
    if (!keyword.trim() && !location.trim()) {
      alert('Please enter an industry or keyword and location to search.');
      return;
    }
    setScouting(true);
    setScoutResults(null);

    try {
      const res = await fetch('/api/prospector/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keyword.trim(),
          industry: keyword.trim(),
          location: location.trim() || 'Los Angeles, CA',
          limit,
          apiKey,
        }),
      });

      const json = await res.json();
      if (json.ok) {
        setScoutResults(json.prospects || []);
      } else {
        alert(`Scout failed: ${json.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Scout launch failed:', err);
      alert('Failed to execute AI search. Please check your network and API key.');
    } finally {
      setScouting(false);
    }
  }

  // Save scouted prospects to DB & enroll in drip campaign
  async function handleSaveScoutProspects() {
    if (!scoutResults || scoutResults.length === 0) return;
    try {
      const res = await fetch('/api/prospector/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospects: scoutResults }),
      });
      const json = await res.json();
      if (json.ok) {
        alert(`Successfully saved ${json.savedCount || scoutResults.length} verified prospects to database and enrolled in cold email drip campaign!`);
        setScoutResults(null);
        setActiveTab('database');
        fetchProspects();
      } else {
        alert(`Save failed: ${json.error}`);
      }
    } catch (err) {
      alert('Failed to save prospects.');
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
        alert(`Successfully imported ${json.savedCount || prospectsList.length} prospects!`);
        setCsvContent('');
        setActiveTab('database');
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
        setDripMessage(`Processed! ${json.processed || 0} drip emails dispatched to active prospects pitching the Q3 Growth Bundle Offer.`);
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

  const promptPreviewText = `"Find ${limit} real, active businesses currently operating in ${location || '[Location]'}${keyword ? ` matching keyword/industry "${keyword}"` : ''}. Focus on businesses likely needing modern web development (Next.js/React starting at $2,500), built-in CRM lead management, and local YouTube AI video pre-roll ad campaigns."`;

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
                  placeholder="What Industry or Keyword? (e.g. Restaurants, Auto Dealerships, Security Systems)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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

              {showApiKeyInput && (
                <div className="auth__field">
                  <label className="auth__label" htmlFor="perplexity-key">PERPLEXITY API KEY (Optional)</label>
                  <input
                    id="perplexity-key"
                    className="auth__input"
                    type="password"
                    placeholder="pplx-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  style={{ background: 'none', border: 'none', color: '#00b4d8', fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {showApiKeyInput ? 'Hide API Key Settings' : '🔑 Configure Perplexity API Key'}
                </button>
              </div>

              <button className="btn-teal-lg" type="submit" disabled={scouting}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                {scouting ? 'Crawling Web with Perplexity AI…' : 'Launch AI Scout'}
              </button>

              <div className="scout__subnote">POWERED BY PERPLEXITY AI &amp; SEARCH GROUNDING</div>
            </form>
          </div>

          <div className="prospector__card">
            <h3 className="prospector__card-title">AI Configuration</h3>
            <div className="prompt-box">
              {promptPreviewText}
            </div>
            <p className="prompt-help">
              This search will crawl the live web to find real, verified businesses. It filters for public contact data allowed for business outreach.
            </p>
          </div>
        </div>
      )}

      {/* Scout Results Display */}
      {scoutResults && (
        <div className="scout-results" style={{ marginTop: '2rem' }}>
          <div className="app__actions">
            <h3>Discovered Business Leads ({scoutResults.length})</h3>
            <button onClick={handleSaveScoutProspects} className="btn-teal-lg" style={{ width: 'auto' }}>
              Save All &amp; Enroll in Drip Campaign
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Contact Data</th>
                <th>Industry / Keyword</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {scoutResults.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{item.company}</strong>
                    {item.website && (
                      <div>
                        <a href={item.website} target="_blank" rel="noreferrer" className="text-muted text-sm">
                          {item.website.replace(/^https?:\/\//, '')}
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
                    <span className="tag tag--contact">{item.industry || 'General'}</span>
                  </td>
                  <td className="text-sm">{item.notes || 'Ready for outreach'}</td>
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
          <p className="panel__desc">
            Paste or upload CSV rows of leads to automatically verify and enroll into the Q3 Growth Bundle email drip campaign.
          </p>

          <form onSubmit={handleCsvImport}>
            <div className="auth__field">
              <label className="auth__label" htmlFor="csv-input">CSV DATA (Format: Company, Contact, Email, Phone, Website)</label>
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
              {importingCsv ? 'Processing Import…' : 'Import Prospects & Enroll'}
            </button>
          </form>
        </div>
      )}

      {/* ── TAB 3: DATABASE (VERIFIED PROSPECTS) ── */}
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
                  placeholder="Search name, email, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select className="db-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All Status">All Status</option>
                <option value="NEW">NEW</option>
                <option value="QUEUED">QUEUED</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CONVERTED">CONVERTED</option>
              </select>

              <select className="db-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All Categories">All Categories</option>
                <option value="Auto">Auto Dealerships</option>
                <option value="Restaurant">Restaurants</option>
                <option value="Service">Services</option>
                <option value="Security">Security</option>
              </select>

              <select className="db-select" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
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
                    No verified prospects found. Launch an AI Search to populate prospects.
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
              <button className="btn-db-refresh" onClick={() => alert('Sequences updated.')}>
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
              + New Sequence / Test Email
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
