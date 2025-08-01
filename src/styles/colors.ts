export type Colors = typeof colors.light

export const colors = {
  light: {
    // 主色调 - 深蓝色系
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    // 辅助色 - 青绿色系
    secondary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    // 强调色 - 橙色系
    accent: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
    // 灰色系
    gray: "#737373",
    gray1: "#fafafa",
    gray2: "#f5f5f5",
    gray3: "#eeeeee",
    gray4: "#e5e5e5",
    gray5: "#dddddd",
    gray6: "#d4d4d4",
    gray7: "#a3a3a3",
    gray8: "#737373",
    gray9: "#525252",
    gray10: "#404040",
    gray11: "#262626",
    gray12: "#171717",
    // 背景色
    background: {
      primary: "#ffffff",
      secondary: "#fafafa",
      tertiary: "#f5f5f5",
      card: "#ffffff",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
    // 文字颜色
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
      tertiary: "#9ca3af",
      inverse: "#ffffff",
      link: "#0ea5e9",
      linkHover: "#0284c7",
    },
    // 边框色
    border: {
      primary: "#e5e7eb",
      secondary: "#d1d5db",
      tertiary: "#f3f4f6",
      focus: "#0ea5e9",
    },
    // 状态色
    status: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
  dark: {
    // 主色调 - 深蓝色系 (暗色调整)
    primary: {
      50: "#0c1021",
      100: "#1a1f37",
      200: "#2d3748",
      300: "#4a5568",
      400: "#718096",
      500: "#a0aec0",
      600: "#cbd5e0",
      700: "#e2e8f0",
      800: "#f7fafc",
      900: "#ffffff",
    },
    // 辅助色 - 青绿色系 (暗色调整)
    secondary: {
      50: "#0a1f14",
      100: "#1a2e23",
      200: "#2d4a37",
      300: "#4a6b5b",
      400: "#68a085",
      500: "#85d1aa",
      600: "#a3f7c7",
      700: "#bbf7d0",
      800: "#dcfce7",
      900: "#f0fdf4",
    },
    // 强调色 - 橙色系 (暗色调整)
    accent: {
      50: "#2d1b0e",
      100: "#4a2c17",
      200: "#6b3e20",
      300: "#8b542a",
      400: "#a86234",
      500: "#c8743e",
      600: "#e8864a",
      700: "#f59e0b",
      800: "#fbbf24",
      900: "#fef3c7",
    },
    // 灰色系
    gray: "#737373",
    gray1: "#0f0f0f",
    gray2: "#1a1a1a",
    gray3: "#222222",
    gray4: "#262626",
    gray5: "#333333",
    gray6: "#404040",
    gray7: "#525252",
    gray8: "#737373",
    gray9: "#a3a3a3",
    gray10: "#d4d4d4",
    gray11: "#e5e5e5",
    gray12: "#fafafa",
    // 背景色
    background: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      card: "#1e293b",
      overlay: "rgba(0, 0, 0, 0.8)",
    },
    // 文字颜色
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
      link: "#60a5fa",
      linkHover: "#3b82f6",
    },
    // 边框色
    border: {
      primary: "#334155",
      secondary: "#475569",
      tertiary: "#64748b",
      focus: "#60a5fa",
    },
    // 状态色
    status: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
}
