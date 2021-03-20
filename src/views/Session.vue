<template>
  <div>
    <router-view v-if="session" :session="session"></router-view>
    <SkeletonList v-else />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SkeletonList from "../components/SkeletonList";

export default {
  props: {
    sessionId: String,
  },
  components: {
    SkeletonList,
  },
  data: function() {
    return {
      session: null,
    };
  },
  created() {
    this.setSessionId(this.sessionId);
    this.session = this.getSession;
  },
  computed: {
    ...mapGetters({ getSession: "session" }),
  },
  methods: {
    ...mapMutations(["setSessionId"]),
  },
};
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
</style>
