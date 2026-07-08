export default function Preloader() {
  return (
    <div className="preloader" id="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <img className="preloader__mark" src="/assets/img/logo-gobiya-red-rocket-07082026.svg" alt="" />
        <span className="preloader__word">Gobiya</span>
      </div>
      <div className="preloader__bar"><span></span></div>
    </div>
  );
}
