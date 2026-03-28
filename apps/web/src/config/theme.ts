import type { ThemeConfig } from 'antd'
import { theme as antdTheme } from 'antd'

export const COLORS = {
  // Base — light, airy
  bg: '#FFFFFF',
  surface: '#F7F8FA',
  surfaceHover: '#F0F1F5',
  border: '#E8E8F0',
  borderLight: '#F0F0F6',

  // Text — high contrast on white
  text: '#1A1A2E',
  textSecondary: '#6B6B82',
  textMuted: '#9D9DB5',

  // Brand — vivid blue
  primary: '#1668DC',
  primaryHover: '#0958D9',
  primaryLight: '#E8F0FD',
  primaryGlow: 'rgba(22, 104, 220, 0.15)',

  // Accent
  success: '#00C47A',
  warning: '#F5A623',
  error: '#FF4D4F',

  // Shadows
  shadow: '0 4px 20px rgba(12, 12, 20, 0.07)',
  shadowLg: '0 16px 48px rgba(12, 12, 20, 0.12)',

  // Radius
  radius: 16,
  radiusSm: 10,
} as const

export const COLORS_DARK = {
  bg: '#0D0D12',
  surface: '#16161D',
  surfaceHover: '#1E1E28',
  border: '#2A2A3C',
  borderLight: '#222233',

  text: '#E8E8F0',
  textSecondary: '#9D9DB5',
  textMuted: '#6B6B82',

  primary: '#4C8BF5',
  primaryHover: '#6BA1FF',
  primaryLight: 'rgba(76, 139, 245, 0.12)',
  primaryGlow: 'rgba(76, 139, 245, 0.2)',

  success: '#00C47A',
  warning: '#F5A623',
  error: '#FF4D4F',

  shadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  shadowLg: '0 16px 48px rgba(0, 0, 0, 0.4)',

  radius: 16,
  radiusSm: 10,
} as const

const sharedComponents = {
  Button: {
    borderRadius: COLORS.radiusSm,
    controlHeight: 44,
    fontWeight: 600,
  },
  Input: {
    controlHeight: 44,
    borderRadius: COLORS.radiusSm,
  },
  Select: {
    controlHeight: 44,
    borderRadius: COLORS.radiusSm,
  },
  Collapse: {
    borderRadiusLG: COLORS.radius,
  },
}

export const themeConfig: ThemeConfig = {
  token: {
    colorBgBase: COLORS.bg,
    colorPrimary: COLORS.primary,
    colorInfo: COLORS.primary,
    colorSuccess: COLORS.success,
    colorWarning: COLORS.warning,
    colorError: COLORS.error,
    colorBgContainer: COLORS.bg,
    colorBorder: COLORS.border,
    colorBorderSecondary: COLORS.borderLight,
    colorText: COLORS.text,
    colorTextSecondary: COLORS.textSecondary,
    colorTextTertiary: COLORS.textMuted,
    borderRadius: COLORS.radius,
    fontSize: 15,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    controlHeight: 44,
    colorLink: COLORS.primary,
    colorLinkHover: COLORS.primaryHover,
    boxShadow: COLORS.shadow,
  },
  components: {
    ...sharedComponents,
    Button: {
      ...sharedComponents.Button,
      colorPrimary: COLORS.primary,
      colorPrimaryHover: COLORS.primaryHover,
    },
    Table: {
      colorBgContainer: COLORS.bg,
      headerBg: COLORS.surface,
      headerColor: COLORS.textSecondary,
      rowHoverBg: COLORS.surface,
      borderColor: COLORS.border,
    },
    Card: {
      colorBgContainer: COLORS.bg,
      colorBorderSecondary: COLORS.border,
      borderRadiusLG: COLORS.radius,
    },
    Input: {
      ...sharedComponents.Input,
      colorBgContainer: COLORS.bg,
      colorBorder: COLORS.border,
      activeBorderColor: COLORS.primary,
      hoverBorderColor: '#D0D0E0',
    },
    Select: {
      ...sharedComponents.Select,
      colorBgContainer: COLORS.bg,
      colorBorder: COLORS.border,
    },
    Collapse: {
      ...sharedComponents.Collapse,
      colorBgContainer: COLORS.bg,
      colorBorder: COLORS.border,
      headerBg: COLORS.bg,
    },
    Tag: {
      defaultBg: COLORS.primaryLight,
      defaultColor: COLORS.primary,
    },
    Drawer: {
      colorBgElevated: COLORS.bg,
    },
    Modal: {
      colorBgElevated: COLORS.bg,
    },
  },
}

export const darkThemeConfig: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorBgBase: COLORS_DARK.bg,
    colorPrimary: COLORS_DARK.primary,
    colorInfo: COLORS_DARK.primary,
    colorSuccess: COLORS_DARK.success,
    colorWarning: COLORS_DARK.warning,
    colorError: COLORS_DARK.error,
    colorBgContainer: COLORS_DARK.surface,
    colorBorder: COLORS_DARK.border,
    colorBorderSecondary: COLORS_DARK.borderLight,
    colorText: COLORS_DARK.text,
    colorTextSecondary: COLORS_DARK.textSecondary,
    colorTextTertiary: COLORS_DARK.textMuted,
    borderRadius: COLORS_DARK.radius,
    fontSize: 15,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    controlHeight: 44,
    colorLink: COLORS_DARK.primary,
    colorLinkHover: COLORS_DARK.primaryHover,
    boxShadow: COLORS_DARK.shadow,
  },
  components: {
    ...sharedComponents,
    Button: {
      ...sharedComponents.Button,
      colorPrimary: COLORS_DARK.primary,
      colorPrimaryHover: COLORS_DARK.primaryHover,
    },
    Table: {
      colorBgContainer: COLORS_DARK.surface,
      headerBg: COLORS_DARK.bg,
      headerColor: COLORS_DARK.textSecondary,
      rowHoverBg: COLORS_DARK.surfaceHover,
      borderColor: COLORS_DARK.border,
    },
    Card: {
      colorBgContainer: COLORS_DARK.surface,
      colorBorderSecondary: COLORS_DARK.border,
      borderRadiusLG: COLORS_DARK.radius,
    },
    Input: {
      ...sharedComponents.Input,
      colorBgContainer: COLORS_DARK.bg,
      colorBorder: COLORS_DARK.border,
      activeBorderColor: COLORS_DARK.primary,
      hoverBorderColor: COLORS_DARK.border,
    },
    Select: {
      ...sharedComponents.Select,
      colorBgContainer: COLORS_DARK.bg,
      colorBorder: COLORS_DARK.border,
    },
    Collapse: {
      ...sharedComponents.Collapse,
      colorBgContainer: COLORS_DARK.surface,
      colorBorder: COLORS_DARK.border,
      headerBg: COLORS_DARK.surface,
    },
    Tag: {
      defaultBg: COLORS_DARK.primaryLight,
      defaultColor: COLORS_DARK.primary,
    },
    Drawer: {
      colorBgElevated: COLORS_DARK.surface,
    },
    Modal: {
      colorBgElevated: COLORS_DARK.surface,
    },
  },
}
