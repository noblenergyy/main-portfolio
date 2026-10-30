/**
 * Ambient "Noverstorm" weather for the hero: slow-drifting storm clouds and,
 * every so often, a soft flash of distant lightning behind them. Pure CSS.
 */
export function HeroWeather() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="storm-cloud storm-cloud-a" />
      <div className="storm-cloud storm-cloud-b" />
      <div className="storm-cloud storm-cloud-c" />
      <div className="distant-flash" />
    </div>
  )
}
