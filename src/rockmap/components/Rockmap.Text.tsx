import * as React from 'react';

import {useLetterFormFontFamily} from '@/letterform/hooks';
import {colors} from '@/tailwind/assets';
import {ThemeDigitize} from '@/theme/components';
import {useThemeContext} from '@/theme/contexts';

export const RockmapText = React.memo(
  function RockmapText(): JSX.Element {
    const {fontFamily} = useLetterFormFontFamily();
    const {primaryColorSelection} = useThemeContext();
    const primary = colors[primaryColorSelection];

    const styles = React.useMemo(
      () => ({
        d: {
          fill: "#8e8e8e",
        },
        d_completed: {
          fill: primary,
        },
        e: {
          fill: "#8e8e8e",
          fontSize: "25px",
          fontFamily,
          fontVariationSettings: "'wdth' 100",
          stroke: "#8e8e8e",
        },
        e_completed: {
          fill: primary,
          strokeWidth: 2,
          fontSize: "25px",
          fontFamily,
          fontVariationSettings: "'wdth' 100",
          stroke: primary,
        },
        f: {
          fontFamily,
          fontSize: "32.57px",
          fill: colors.accent,
          stroke: colors.accent,
          strokeWidth: 4,
        },
        f_completed: {
          fontFamily,
          fontSize: "32.57px",
          fill: primary,
          stroke: primary,
          strokeWidth: 4,
        },
        g: {
          stroke: "#d1d0d1",
          strokeWidth: "5px",
          strokeMiterlimit: 10,
          fill: "none",
        },
        h: {
          stroke: "#fff",
          strokeWidth: "4px",
          strokeMiterlimit: 10,
          fill: "none",
        },
        h_completed: {
          stroke: primary,
          strokeWidth: "6px",
          strokeMiterlimit: 10,
          fill: "none",
        }
      }   as const),
      [fontFamily, primary]
    );

    return (
      <svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2945.47 1325.18">
        <g id="c">
          <polyline {...styles.h} points="818.92 213.27 727.56 380.18 640.46 539.3 553.36 698.42 466.26 857.54"/>
          {/* */}
          <polyline {...styles.h_completed} points="727.56 380.18 640.46 539.3 553.36 698.42 466.26 857.54"/>

          <line {...styles.h} x1="1589.7" y1="460.12" x2="1589.7" y2="663.63"/>
          <polyline {...styles.h} points="1382.05 706.4 1240.86 532.79 1099.56 359.05 1166.08 142.21 818.92 213.27 950.03 374.34 1526.59 1082.62 1869.88 1010.13 1589.7 663.63 1310.37 315.53 1166.08 142.21"/>
          <polyline {...styles.h} points="1661.4 851.45 1589.7 663.63 1866.49 809.24 1869.88 605.91 2074.21 766.5"/>
          <polyline {...styles.h} points="1869.88 605.91 1591.65 460.44 1450.59 286.01 1166.08 142.21 1647.63 42.67 2352.95 911.68 1869.88 1010.13"/>
          <line {...styles.h} x1="2197.53" y1="1118.6" x2="1869.88" y2="1010.13"/>
          <polyline {...styles.h} points="2472.17 1061.54 1869.88 1010.13 1922.98 1175.68"/>
          <polyline {...styles.h} points="1526.59 1082.62 2041.77 1323.08 2864.23 1148.72 2352.95 911.68"/>

          <line {...styles.h} x1="914.54" y1="760.43" x2="914.54" y2="841.93"/>
          <line {...styles.h_completed} x1="914.54" y1="760.43" x2="914.54" y2="841.93"/>

          <line {...styles.h} x1="1954.91" y1="420.84" x2="2055.13" y2="420.84"/>
          <line {...styles.h} x1="2581.3" y1="1017.28" x2="2681.52" y2="1017.28"/>

          <line {...styles.h} x1="1214.07" y1="698.7" x2="466.26" y2="857.54"/>

          {/* first two*/}
          <line {...styles.h_completed} x1="917.54" y1="762.43" x2="466.26" y2="857.54"/>

          <circle {...styles.d} cx="554.43" cy="696.47" r="7.15"/>
          <circle {...styles.d} cx="642.59" cy="535.41" r="7.15"/>
          <circle {...styles.d} cx="730.75" cy="374.34" r="7.15"/>
          <circle {...styles.d} cx="1450.59" cy="286.01" r="7.15"/>
          <circle {...styles.d} cx="1589.7" cy="460.12" r="7.15"/>
          <circle {...styles.d} cx="1240.97" cy="532.33" r="7.15"/>
          <circle {...styles.d} cx="1869.88" cy="1010.13" r="7.15"/>
          <circle {...styles.d} cx="1100.38" cy="360.04" r="7.15"/>
          <circle {...styles.d} cx="1382.05" cy="705.85" r="7.15"/>
          <circle {...styles.d} cx="1661.4" cy="851.45" r="7.15"/>
          <circle {...styles.d} cx="1866.49" cy="809.24" r="7.15"/>
          <circle {...styles.d} cx="1869.88" cy="605.91" r="7.15"/>
          <circle {...styles.d} cx="2074.21" cy="766.5" r="7.15"/>
          <circle {...styles.d} cx="1589.7" cy="663.63" r="7.15"/>
          <circle {...styles.d} cx="2472.17" cy="1061.54" r="7.15"/>
          <circle {...styles.d} cx="2197.53" cy="1118.6" r="7.15"/>
          <circle {...styles.d} cx="1922.98" cy="1175.68" r="7.15"/>
          <circle {...styles.d} cx="1166.08" cy="142.21" r="7.15"/>
          <circle {...styles.d} cx="1647.63" cy="42.67" r="7.15"/>
          <circle {...styles.d} cx="466.26" cy="857.54" r="7.15"/>
          <circle {...styles.d} cx="818.92" cy="213.27" r="7.15"/>
          <rect {...styles.d_completed} x="723.2" y="366.93" width="16" height="16"/>
          <rect {...styles.d} x="811.2" y="205.93" width="16" height="16"/>
          <rect {...styles.d} x="1158.2" y="134.93" width="16" height="16"/>
          <rect {...styles.d} x="1092.2" y="352.93" width="16" height="16"/>
          <rect {...styles.d} x="1582.2" y="451.93" width="16" height="16"/>
          <rect {...styles.d} x="1443.2" y="277.93" width="16" height="16"/>
          <rect {...styles.d} x="1233.2" y="523.93" width="16" height="16"/>
          <rect {...styles.d} x="1374.2" y="697.93" width="16" height="16"/>
          <rect {...styles.d} x="1582.2" y="655.93" width="16" height="16"/>
          <rect {...styles.d} x="1654.2" y="843.93" width="16" height="16"/>
          <rect {...styles.d} x="1859.2" y="801.93" width="16" height="16"/>
          <rect {...styles.d} x="2066.2" y="758.93" width="16" height="16"/>
          <rect {...styles.d} x="1862.2" y="1001.93" width="16" height="16"/>
          <rect {...styles.d} x="1915.2" y="1167.93" width="16" height="16"/>
          <rect {...styles.d} x="2189.2" y="1110.93" width="16" height="16"/>
          <rect {...styles.d} x="2464.2" y="1053.93" width="16" height="16"/>
          <rect {...styles.d} x="1862.2" y="598.93" width="16" height="16"/>
          <rect {...styles.d} x="1640.2" y="34.93" width="16" height="16"/>
          <rect {...styles.d_completed} x="634.2" y="526.93" width="16" height="16"/>
          <rect {...styles.d_completed} x="546.2" y="687.93" width="16" height="16"/>
          <rect {...styles.d_completed} x="458.2" y="848.93" width="16" height="16"/>
          <line {...styles.g} x1="981.23" y1="412.03" x2="946.23" y2="370.03"/>
          <line {...styles.g} x1="1124.23" y1="587.94" x2="1103.23" y2="562.03"/>
          <line {...styles.g} x1="1265.23" y1="762.03" x2="1246.23" y2="739.03"/>
          <line {...styles.g} x1="2105.23" y1="606.03" x2="2063.23" y2="554.03"/>
          <line {...styles.g} x1="2271.23" y1="811.03" x2="2238.23" y2="770.03"/>
          <text {...styles.f_completed} transform="translate(819.21 896.89)">
              <tspan x="0" y="0">BUILD</tspan>
          </text>
          <text {...styles.f} transform="translate(2079.19 436.23)">
            <HiddenGoal children="ADMIN" />
          </text>
          <text {...styles.f} transform="translate(2710.46 1031.86)">
            <HiddenGoal children="EXPAND" />
          </text>
          <text {...styles.e} transform="translate(1255.07 751.66)">
            <HiddenGoal children="CAST" />
          </text>
          <text {...styles.e} transform="translate(1115.23 576.22)">
            <HiddenGoal children="VOTE" />
          </text>
          <text {...styles.e} transform="translate(882.13 403.75)">
            <HiddenGoal children="PERFORM" />
          </text>
          <text {...styles.e} transform="translate(534.36 200.73)">
            <tspan x="0" y="0">FULL MINT</tspan>
          </text>
          <text {...styles.e_completed} transform="translate(439.56 361.77)">
              <tspan x="0" y="0">RE-LAUNCH</tspan>
          </text>
          <text {...styles.e_completed} transform="translate(413.56 522.77)">
              <tspan x="0" y="0">WEBSITE</tspan>
          </text>
          <text {...styles.e_completed} transform="translate(84.5 687.67)">
            <tspan x="0" y="0">METADATA UPDATE</tspan>
          </text>
          <text {...styles.e_completed} transform="translate(.5 841.67)">
            <tspan x="0" y="0">INITIAL RELEASE</tspan>
          </text>
          <text {...styles.e} transform="translate(872.75 121.04)">
            <HiddenGoal children="PARLIAMENT" />
          </text>
          <text {...styles.e} transform="translate(1433.62 25.5)">
            <HiddenGoal children="MISSION" />
          </text>
          <text {...styles.e} transform="translate(1471.41 270.52)">
            <HiddenGoal children="EXHIBIT" />
          </text>
          <text {...styles.e} transform="translate(1607.92 443.9)">
            <HiddenGoal children="CURATE" />
          </text>
          <text {...styles.e} transform="translate(1611.86 652.08)">
            <HiddenGoal children="VIRTUAL" />
          </text>
          <text {...styles.e} transform="translate(1474.53 896.64)">
            <HiddenGoal children="SPACES" />
          </text>
          <text {...styles.e} transform="translate(1879.02 858.39)">
            <HiddenGoal children="SCULPTURES" />
          </text>
          <text {...styles.e} transform="translate(2093.65 805.38)">
            <HiddenGoal children="PLACES" />
          </text>
          <text {...styles.e} transform="translate(1889.23 591.19)">
            <HiddenGoal children="PHYSICAL" />
          </text>
          <text {...styles.e} transform="translate(1939.77 1223.75)">
            <HiddenGoal children="COLLABORATE" />
          </text>
          <text {...styles.e} transform="translate(2228.95 1156.43)">
            <HiddenGoal children="COLLECT" />
          </text>
          <text {...styles.e} transform="translate(2478.42 1110.88)">
            <HiddenGoal children="CONTROL" />
          </text>
        </g>
      </svg>
    );
  }
);

const HiddenGoal = ({
  children,
}: {
  readonly children: string;
}) => (
  <tspan x="0" y="0">
    <ThemeDigitize children={children} infinite disabled={false} />
  </tspan>
);
