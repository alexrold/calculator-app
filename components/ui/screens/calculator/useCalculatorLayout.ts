import {
  LAYOUT_ROWS,
  MIN_RESERVED_RESULT_HEIGHT,
  PERCENT_RESERVED,
  ROWS_COUNT,
  type ButtonDef,
} from '@/constants/CalculatorLayout';
import {
  CONTAINER_PADDING,
  GAP_SIZE,
  MAX_BUTTON_MOBILE,
  MAX_BUTTON_TABLET,
  MIN_BUTTON,
} from '@/constants/Spacing';
import {useMemo} from 'react';
import {useWindowDimensions, type ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function useCalculatorLayout() {
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Layout constants
  const buttonsPerRow = 4;
  const containerPadding = CONTAINER_PADDING;
  const gap = GAP_SIZE;
  const minButton = MIN_BUTTON;
  const maxButton = screenWidth >= 600 ? MAX_BUTTON_TABLET : MAX_BUTTON_MOBILE;

  // Reserve a portion of vertical space for the result area (centralized constants)
  const minReservedResultHeight = MIN_RESERVED_RESULT_HEIGHT;
  const percentReserved = PERCENT_RESERVED;
  const reservedFromPercent = Math.floor(screenHeight * percentReserved);
  const reservedResultHeight = Math.max(
    minReservedResultHeight,
    Math.floor(insets.top + reservedFromPercent)
  );

  const rowsCount = ROWS_COUNT;

  const sizeFromWidth =
    (screenWidth - 2 * containerPadding - (buttonsPerRow - 1) * gap) /
    buttonsPerRow;
  const availableHeightForButtons =
    screenHeight - reservedResultHeight - 2 * containerPadding;
  const sizeFromHeight = Math.floor(
    (availableHeightForButtons - (rowsCount - 1) * gap) / rowsCount
  );

  const rawSize = Math.min(sizeFromWidth, sizeFromHeight);
  const buttonSize = Math.max(
    minButton,
    Math.min(maxButton, Math.floor(rawSize))
  );

  // Use centralized layout rows
  const layoutRows: ButtonDef[][] = useMemo(() => LAYOUT_ROWS, []);

  // Calculate the real width of each row (accounting doubles and gaps)
  const rowWrapperStyle: ViewStyle = useMemo(() => {
    const availableWidth = screenWidth - 2 * containerPadding;

    const correctedRowWidths = layoutRows.map((row) => {
      const base = row.reduce(
        (acc, btn) => acc + (btn.double ? buttonSize * 2 : buttonSize),
        0
      );
      const gapsTotal = (row.length - 1) * gap;
      return base + gapsTotal;
    });

    const maxRowWidth = Math.max(...correctedRowWidths);
    const wrapperWidth = Math.min(maxRowWidth, availableWidth);
    return {width: wrapperWidth, alignSelf: 'center'} as ViewStyle;
  }, [screenWidth, containerPadding, gap, layoutRows, buttonSize]);

  return {
    buttonSize,
    rowWrapperStyle,
    layoutRows,
    gap,
    containerPadding,
    buttonsPerRow,
  } as const;
}
