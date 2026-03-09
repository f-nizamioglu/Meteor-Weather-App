import React from 'react';

/**
 * WeatherIcon — Hand-crafted animated SVG weather icons.
 * Maps OpenWeatherMap icon codes to premium animated illustrations.
 *
 * Icon codes: https://openweathermap.org/weather-conditions#Icon-list
 * Last two chars:  d = day, n = night
 * First two digits: 01=clear, 02=few clouds, 03=scattered clouds,
 *                   04=broken clouds, 09=shower rain, 10=rain,
 *                   11=thunderstorm, 13=snow, 50=mist
 */
const WeatherIcon = ({ code, size = 96 }) => {
    const base = code?.substring(0, 2);
    const isNight = code?.endsWith('n');

    const iconMap = {
        '01': isNight ? <MoonIcon size={size} /> : <SunIcon size={size} />,
        '02': isNight ? <CloudMoonIcon size={size} /> : <CloudSunIcon size={size} />,
        '03': <CloudIcon size={size} />,
        '04': <CloudsIcon size={size} />,
        '09': <ShowerRainIcon size={size} />,
        '10': isNight ? <RainIcon size={size} /> : <RainIcon size={size} />,
        '11': <ThunderstormIcon size={size} />,
        '13': <SnowIcon size={size} />,
        '50': <MistIcon size={size} />,
    };

    return (
        <div className="wx-icon-wrapper" style={{ width: size, height: size }}>
            {iconMap[base] || <CloudIcon size={size} />}
        </div>
    );
};

/* ============================================================
   INDIVIDUAL ICON COMPONENTS
   ============================================================ */

const SunIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-sun">
        {/* Warm glow pulse */}
        <circle cx="50" cy="50" r="38" className="sun-glow" />
        {/* Rays group — rotates */}
        <g className="sun-rays">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                    key={angle}
                    x1="50" y1="8"
                    x2="50" y2="18"
                    transform={`rotate(${angle} 50 50)`}
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                />
            ))}
        </g>
        {/* Core sun */}
        <circle cx="50" cy="50" r="20" className="sun-core" />
        {/* Inner highlight */}
        <circle cx="44" cy="44" r="7" fill="rgba(255,255,255,0.25)" />
    </svg>
);

const MoonIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-moon">
        {/* Soft glow */}
        <circle cx="48" cy="50" r="36" className="moon-glow" />
        {/* Moon crescent via mask */}
        <mask id="moonMask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <circle cx="62" cy="40" r="22" fill="black" />
        </mask>
        <circle cx="48" cy="50" r="22" fill="#e2e8f0" mask="url(#moonMask)" className="moon-body" />
        {/* Stars */}
        <circle cx="75" cy="25" r="1.5" fill="#e2e8f0" className="star star-1" />
        <circle cx="82" cy="40" r="1" fill="#cbd5e1" className="star star-2" />
        <circle cx="70" cy="65" r="1.2" fill="#e2e8f0" className="star star-3" />
    </svg>
);

const CloudSunIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-cloud-sun">
        {/* Sun peeking behind */}
        <g className="sun-behind">
            <circle cx="35" cy="35" r="14" className="sun-core-sm" />
            <g className="sun-rays-sm">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <line
                        key={angle}
                        x1="35" y1="14"
                        x2="35" y2="20"
                        transform={`rotate(${angle} 35 35)`}
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.7"
                    />
                ))}
            </g>
        </g>
        {/* Cloud */}
        <path
            d="M72 72H32a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 72 72Z"
            className="cloud-body"
        />
    </svg>
);

const CloudMoonIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-cloud-moon">
        {/* Moon peeking behind */}
        <mask id="moonMaskSm">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <circle cx="42" cy="26" r="11" fill="black" />
        </mask>
        <circle cx="34" cy="32" r="13" fill="#cbd5e1" mask="url(#moonMaskSm)" opacity="0.7" className="moon-body" />
        {/* Cloud */}
        <path
            d="M72 72H32a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 72 72Z"
            className="cloud-body"
        />
    </svg>
);

const CloudIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-cloud">
        <path
            d="M74 70H30a20 20 0 0 1-2-39.9 24 24 0 0 1 46.4-3.4A15.5 15.5 0 0 1 74 70Z"
            className="cloud-body cloud-float"
        />
    </svg>
);

const CloudsIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-clouds">
        {/* Back cloud */}
        <path
            d="M68 58H34a14 14 0 0 1-1.4-27.9 18 18 0 0 1 34.8-2.5A11 11 0 0 1 68 58Z"
            className="cloud-body cloud-back"
        />
        {/* Front cloud */}
        <path
            d="M78 78H40a16 16 0 0 1-1.6-31.9 20 20 0 0 1 38.8-2.8A12.5 12.5 0 0 1 78 78Z"
            className="cloud-body cloud-front"
        />
    </svg>
);

const ShowerRainIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-shower">
        {/* Cloud */}
        <path
            d="M74 55H30a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 74 55Z"
            className="cloud-body"
        />
        {/* Rain drops */}
        <line x1="35" y1="62" x2="32" y2="76" className="raindrop drop-1" />
        <line x1="45" y1="62" x2="42" y2="78" className="raindrop drop-2" />
        <line x1="55" y1="62" x2="52" y2="76" className="raindrop drop-3" />
        <line x1="65" y1="62" x2="62" y2="74" className="raindrop drop-4" />
    </svg>
);

const RainIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-rain">
        {/* Cloud */}
        <path
            d="M74 50H30a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 74 50Z"
            className="cloud-body"
        />
        {/* Heavy rain drops */}
        <line x1="30" y1="58" x2="26" y2="74" className="raindrop drop-1" />
        <line x1="40" y1="58" x2="36" y2="76" className="raindrop drop-2" />
        <line x1="50" y1="58" x2="46" y2="74" className="raindrop drop-3" />
        <line x1="60" y1="58" x2="56" y2="76" className="raindrop drop-4" />
        <line x1="70" y1="58" x2="66" y2="72" className="raindrop drop-5" />
    </svg>
);

const ThunderstormIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-thunder">
        {/* Cloud */}
        <path
            d="M74 50H30a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 74 50Z"
            className="cloud-body cloud-dark"
        />
        {/* Lightning bolt */}
        <polygon
            points="52,48 44,68 50,68 46,88 60,62 54,62 60,48"
            className="lightning-bolt"
        />
        {/* Rain */}
        <line x1="32" y1="56" x2="28" y2="70" className="raindrop drop-1" />
        <line x1="70" y1="56" x2="66" y2="68" className="raindrop drop-3" />
    </svg>
);

const SnowIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-snow">
        {/* Cloud */}
        <path
            d="M74 50H30a18 18 0 0 1-1.8-35.9 22 22 0 0 1 42.6-3.1A14 14 0 0 1 74 50Z"
            className="cloud-body"
        />
        {/* Snowflakes */}
        <g className="snowflake sf-1"><circle cx="35" cy="64" r="3" /><SnowflakeShape cx={35} cy={64} /></g>
        <g className="snowflake sf-2"><circle cx="50" cy="70" r="3" /><SnowflakeShape cx={50} cy={70} /></g>
        <g className="snowflake sf-3"><circle cx="65" cy="64" r="3" /><SnowflakeShape cx={65} cy={64} /></g>
    </svg>
);

const SnowflakeShape = ({ cx, cy }) => (
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
        <line x1={cx - 4.3} y1={cy - 2.5} x2={cx + 4.3} y2={cy + 2.5} />
        <line x1={cx - 4.3} y1={cy + 2.5} x2={cx + 4.3} y2={cy - 2.5} />
    </g>
);

const MistIcon = ({ size }) => (
    <svg viewBox="0 0 100 100" width={size} height={size} className="wx-icon wx-mist">
        <line x1="20" y1="35" x2="80" y2="35" className="mist-line mist-1" />
        <line x1="25" y1="47" x2="75" y2="47" className="mist-line mist-2" />
        <line x1="18" y1="59" x2="82" y2="59" className="mist-line mist-3" />
        <line x1="28" y1="71" x2="72" y2="71" className="mist-line mist-4" />
    </svg>
);

export default WeatherIcon;
