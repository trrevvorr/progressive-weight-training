import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue,
        secondary: colors.grey.darken3,
        accent: colors.deepPurple,
        success: colors.green,
        error: colors.red,
      },
    },
  },
});
