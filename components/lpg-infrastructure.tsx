export function LpgInfrastructure() {
  return (
    <div
      className="lpg-infrastructure"
      role="img"
      aria-label="Technical illustration of bulk LPG storage vessels connected to a transfer pipeline and distribution tanker"
    >
      <svg viewBox="0 0 720 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="688" height="488" rx="24" fill="#191C20" stroke="#3A424B" />
        <path d="M48 112H672" stroke="#2B3037" />
        <path d="M48 407H672" stroke="#2B3037" />

        <text x="48" y="72" fill="#9B9892" fontFamily="monospace" fontSize="11" letterSpacing="2.1">
          BULK LPG SUPPLY SYSTEM
        </text>
        <text x="672" y="72" textAnchor="end" fill="#F58220" fontFamily="monospace" fontSize="11" letterSpacing="1.6">
          SU-GAS / 01
        </text>

        <text x="66" y="151" fill="#9B9892" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
          STORAGE
        </text>
        <text x="370" y="151" fill="#9B9892" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
          TRANSFER LINE
        </text>
        <text x="574" y="151" textAnchor="end" fill="#9B9892" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
          OFF-TAKER
        </text>

        <g>
          <rect x="66" y="204" width="224" height="112" rx="56" fill="#111316" stroke="#5C6670" strokeWidth="1.5" />
          <ellipse cx="66" cy="260" rx="22" ry="56" fill="#191C20" stroke="#5C6670" strokeWidth="1.5" />
          <ellipse cx="290" cy="260" rx="22" ry="56" fill="#191C20" stroke="#5C6670" strokeWidth="1.5" />
          <path d="M114 230H242M114 260H242M114 290H242" stroke="#3A424B" />
          <path d="M178 204V181H200V204" stroke="#F58220" strokeWidth="2" />
          <circle cx="189" cy="174" r="7" fill="#F58220" />
          <text x="178" y="349" textAnchor="middle" fill="#F2EFE9" fontFamily="monospace" fontSize="10" letterSpacing="1.3">
            BULK STORAGE
          </text>
          <text x="178" y="367" textAnchor="middle" fill="#9B9892" fontFamily="monospace" fontSize="10">
            CAPACITY PLANNED TO DEMAND
          </text>
        </g>

        <path d="M290 260H404V220H520" stroke="#F58220" strokeWidth="3" />
        <path d="M290 260H404V220H520" stroke="#F8A35C" strokeOpacity="0.3" strokeWidth="10" />
        <circle cx="356" cy="260" r="5" fill="#F58220" />
        <circle cx="468" cy="220" r="5" fill="#F58220" />

        <g>
          <rect x="520" y="184" width="122" height="72" rx="12" fill="#111316" stroke="#5C6670" strokeWidth="1.5" />
          <path d="M520 220H642M544 184V256M574 184V256M604 184V256" stroke="#3A424B" />
          <path d="M536 256V288M624 256V288" stroke="#5C6670" strokeWidth="2" />
          <text x="581" y="316" textAnchor="middle" fill="#F2EFE9" fontFamily="monospace" fontSize="10" letterSpacing="1.3">
            PLANT / ESTATE
          </text>
        </g>

        <g>
          <path d="M110 443H110C95 443 84 432 84 417V394H280V443H110Z" fill="#111316" stroke="#5C6670" strokeWidth="1.5" />
          <path d="M280 410H316L346 443H280V410Z" fill="#111316" stroke="#5C6670" strokeWidth="1.5" />
          <path d="M112 394V370H260V394" stroke="#5C6670" strokeWidth="1.5" />
          <circle cx="134" cy="443" r="14" fill="#191C20" stroke="#5C6670" strokeWidth="1.5" />
          <circle cx="294" cy="443" r="14" fill="#191C20" stroke="#5C6670" strokeWidth="1.5" />
          <path d="M342 427H382V370" stroke="#F58220" strokeWidth="3" />
          <path d="M342 427H382V370" stroke="#F8A35C" strokeOpacity="0.3" strokeWidth="10" />
          <text x="218" y="480" textAnchor="middle" fill="#9B9892" fontFamily="monospace" fontSize="10" letterSpacing="1.3">
            ROAD TANKER DISTRIBUTION
          </text>
        </g>

        <text x="624" y="461" textAnchor="end" fill="#F58220" fontFamily="monospace" fontSize="10" letterSpacing="1.1">
          MEASURED. MOVED. READY.
        </text>
      </svg>
    </div>
  );
}
