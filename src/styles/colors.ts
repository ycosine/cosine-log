import { blue, gray, grayDark } from "@radix-ui/colors"

export type Colors = typeof colors.light & typeof colors.dark

export const colors2 = {
  light: {
    ...gray,
  },
  dark: {
    ...grayDark,
  },
}
export const colors = {
  light: {
    blue1: "#fdfdfe",
    blue2: "#f7f9ff",
    blue3: "#edf2fe",
    blue4: "#dfeaff",
    blue5: "#d0dfff",
    blue6: "#bdd1ff",
    blue7: "#a6bff9",
    blue8: "#87a5ef",
    blue9: "#3d63dd",
    blue10: "#3657c3",
    blue11: "#395bc7",
    blue12: "#1d2e5c",
    gray1: "#fcfcfd",
    gray2: "#f9f9fb",
    gray3: "#eff0f3",
    gray4: "#e7e8ec",
    gray5: "#e0e1e6",
    gray6: "#d8d9e0",
    gray7: "#cdced7",
    gray8: "#b9bbc6",
    gray9: "#8b8d98",
    gray10: "#80828d",
    gray11: "#62636c",
    gray12: "#1e1f24",
  },
  dark: {
    ...blue,
    ...grayDark,
  },
}
