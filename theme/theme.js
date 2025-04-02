"use client";

import { colorsTuple, createTheme, CSSVariablesResolver } from "@mantine/core";
import { settings } from "../settings";

export const theme = createTheme({
  colors: {
    primary: colorsTuple("#0FF0EB")
  },
  defaultRadius: 5,
  components: {
    Container: {
      defaultProps: {
        size: 1400
      }
    },
    Anchor: {
      defaultProps: {
        td: "none",
      }
    },
    Button: {
      defaultProps: {
        color: "var(--mantine-color-primary-5)",
        c: "#000",
      },
    },
    NumberFormatter: {
      defaultProps: {
        thousandSeparator: ",",
        decimalSeparator: ".",
        decimalScale: 2,
        prefix: settings.currency_symbol
      }
    },
    Modal: {
      defaultProps: {
        centered: true
      },
      styles: {
        header: {
          padding: "0 1rem",
        }
      }
    }
  }
});

const resolver = (theme) => ({
  variables: {
    '--global-border-radius': theme.defaultRadius,
  },

});