<template>
  <div class="content">
    <PageHeader>{{ this.routine.name }}</PageHeader>

    <div v-if="sortedSessions.length">
      <v-card
        v-for="session in sortedSessions"
        :key="session.id"
        class="section"
        @click="selectSession(session.id)"
      >
        <v-card-title class="card-title">{{ session.name }}</v-card-title>
        <v-card-actions>
          <div @click.stop>
            <SubmitButton
              :onClick="() => tryDeleteSession(session.id)"
              buttonColor="error"
              errorMessage="Failed to delete session. Try again later."
            >
              Delete
            </SubmitButton>
          </div>
          <v-btn
            text
            color="primary"
            @click.stop="editSession = JSON.parse(JSON.stringify(session))"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-row v-else class="no-sessions-message" justify="center">
      <p class="text--secondary">
        Click the "+" to create your first session
      </p>
    </v-row>

    <v-btn
      key="mdi-plus"
      color="green"
      fab
      large
      dark
      bottom
      right
      fixed
      @click="() => (newSession = { name: null })"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <EditDialog
      dialogTitle="Edit Session"
      v-model="editSession"
      @submit="tryEditSession"
      submitButtonLabel="Save"
    >
    </EditDialog>
    <EditDialog
      dialogTitle="New Session"
      v-model="newSession"
      @submit="tryCreateSession"
      submitButtonLabel="Create"
    >
    </EditDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "../components/SubmitButton";
import PageHeader from "../components/PageHeader";
import EditDialog from "../components/EditDialog";
import routes from "../router/routes";

export default {
  props: {
    routine: Object,
  },
  components: {
    SubmitButton,
    PageHeader,
    EditDialog,
  },
  data: function() {
    return {
      newSession: null,
      editSession: null,
      editSessionName: null,
      editSessionDialogOpen: false,
    };
  },
  computed: {
    ...mapGetters(["userId", "sessions"]),
    sortedSessions() {
      return [...this.sessions].sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
  },
  watch: {
    editSession: function(newEditSession) {
      this.editSessionName = newEditSession && newEditSession.name;
      this.editSessionDialogOpen = Boolean(newEditSession);
    },
    editSessionDialogOpen: function(newEditSessionDialogOpen) {
      if (!newEditSessionDialogOpen) {
        this.editSession = null;
      }
    },
  },
  methods: {
    ...mapActions(["createSession", "deleteSession", "updateSessionName"]),
    tryCreateSession() {
      return this.createSession({
        name: this.newSession.name,
      }).then((this.newSession = null));
    },
    tryEditSession() {
      return this.updateSessionName(this.editSession).then(
        () => (this.editSession = null),
      );
    },
    tryDeleteSession(id) {
      return this.deleteSession(id);
    },
    selectSession(id) {
      this.$router.push({
        name: routes.exercises.name,
        params: { sessionId: id },
      });
    },
  },
};
</script>

<style scoped>
.section {
  margin-top: 1rem;
}

.card-title {
  word-break: break-word;
}

.no-sessions-message {
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
