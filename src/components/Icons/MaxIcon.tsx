interface MaxIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

export const MaxIcon = ({
  width = 32,
  height = 32,
  color = "currentColor",
  className,
}: MaxIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 1000 1000"
    fill="none"
    className={className}
  >
    <g>
      <mask
        id="mask0_184_17"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1000"
        height="1000"
      >
        <path
          d="M776.938 1000H223.062C99.8685 1000 0 900.132 0 776.938V223.062C0 99.8685 99.8685 0 223.062 0H776.938C900.132 0 1000 99.8685 1000 223.062V776.938C1000 900.132 900.132 1000 776.938 1000Z"
          fill={color}
        />
      </mask>
      <g>
        <circle cx="500" cy="500" r="500" fill={color} />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M506.36 793.316C448.263 793.316 421.264 784.827 374.334 750.869C344.649 789.072 250.647 818.926 246.548 767.848C246.548 729.504 238.067 697.103 228.455 661.73C217.005 618.151 204 569.62 204 499.3C204 331.351 341.681 205 504.805 205C668.071 205 795.998 337.576 795.998 500.856C796.546 661.611 666.961 792.459 506.36 793.316ZM508.763 350.169C429.321 346.066 367.407 401.105 353.696 487.415C342.387 558.867 362.46 645.884 379.564 650.411C387.763 652.392 408.401 635.696 421.264 622.821C442.534 637.529 467.303 646.362 493.073 648.43C575.388 652.394 645.723 589.667 651.25 507.365C654.467 424.888 591.09 355.03 508.763 350.31L508.763 350.169Z"
        fill="white"
      />
    </g>
    {/* <defs>
      <clipPath id="clip0_184_17">
        <rect width="1000" height="1000" fill="white" />
      </clipPath>
    </defs> */}
  </svg>
);
