const theme = {
  colors: {
    blue: "#3b82f6",
    green: "#22c55e",

    darkGray: "rgb(50, 50, 50)",
    lightGray: "rgb(200, 200, 200)",
  },
};
type ITheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}

export { theme as THEME };
