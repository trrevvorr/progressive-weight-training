<template>
  <div class="content">
    <PageHeader>{{ this.routine.name }}</PageHeader>

    <div v-if="sortedSessions.length">
      <v-card
        v-for="(session, index) in sortedSessions"
        :key="session.id"
        class="section"
        @click="selectSession(session.id)"
      >
        <v-card-title class="card-title">{{ session.name }}</v-card-title>
        <v-card-actions>
          <v-row>
            <v-col>
              <span @click.stop>
                <SubmitButton
                  :onClick="() => tryDeleteSession(session.id)"
                  buttonColor="error"
                  errorMessage="Failed to delete session. Try again later."
                >
                  Delete
                </SubmitButton>
              </span>
              <v-btn
                text
                color="primary"
                @click.stop="editSession = JSON.parse(JSON.stringify(session))"
              >
                Edit
              </v-btn>
              <v-btn
                text
                color="primary"
                @click.stop="() => startSession(session.id)"
              >
                Start
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                text
                icon
                color="primary"
                :disabled="index === 0"
                @click.stop="tryReorder(index, 1)"
              >
                <v-icon>
                  mdi-arrow-up
                </v-icon>
              </v-btn>
              <v-btn
                text
                icon
                color="primary"
                :disabled="index === sortedSessions.length - 1"
                @click.stop="tryReorder(index, -1)"
              >
                <v-icon>
                  mdi-arrow-down
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
      color="success"
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
      :onSubmit="tryEditSession"
      submitButtonLabel="Save"
    >
    </EditDialog>
    <EditDialog
      dialogTitle="New Session"
      v-model="newSession"
      :onSubmit="tryCreateSession"
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
    };
  },
  computed: {
    ...mapGetters(["userId", "sessions"]),
    sortedSessions() {
      return [...this.sessions].sort((a, b) => a.index - b.index);
    },
  },
  methods: {
    ...mapActions(["createSession", "deleteSession", "updateSession"]),
    tryCreateSession() {
      return this.createSession({
        name: this.newSession.name,
      }).then(() => (this.newSession = null));
    },
    tryEditSession() {
      return this.updateSession(this.editSession).then(
        () => (this.editSession = null),
      );
    },
    tryReorder(currentIndex, numSpacesUp) {
      const oldOrder = [...this.sortedSessions];

      if (
        currentIndex - numSpacesUp < 0 ||
        currentIndex - numSpacesUp >= oldOrder.lenght
      ) {
        throw Error(
          `invalid reorder: currentIndex=${currentIndex}, numSpacesUp=${numSpacesUp}, totalSpaces=${oldOrder.length}`,
        );
      }

      const newOrder = this.moveItemInArray(
        oldOrder,
        currentIndex,
        currentIndex - numSpacesUp,
      );

      const changedOrder = newOrder
        .map((session, index) => ({ ...session, index }))
        .filter((session, index) => session.id !== oldOrder[index].id);

      return Promise.all(
        changedOrder.map(session => this.updateSession(session)),
      );
    },
    moveItemInArray(array, from, to) {
      const copy = [...array];
      // splice(index, numElmentsToDelete, elementToInsert)
      const elementToMove = copy.splice(from, 1)[0];
      copy.splice(to, 0, elementToMove);
      return copy;
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
    startSession(id) {
      this.$router.push({
        name: routes.startSession.name,
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
  text-transform: capitalize;
}

.no-sessions-message {
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
