/**
 * Created by zahed on 1/22/17.
 */
import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';

const Schemas = {};

export default PlayedSessions = new Mongo.Collection('playedSessions');

Schemas.Contestent = new SimpleSchema({
  _id: {
    type: String,
  },
  emails: {
    type: Array
  },
  'emails.$': {
    type: Object,
    blackbox: true,
  },
  profile: {
    type: Object,
    blackbox: true,
  },
});

Schemas.QuizRoom = new SimpleSchema({
  player: {
    type: Schemas.Contestent,
  },
  opponent: {
    type: Schemas.Contestent,
  },
  quizRoomId: {
    type: String,
  },
  course: {
    type: String
  },
  chapter: {
    type: String
  },
  totalQuestion: {
    type: Number,
  },
  questions: {
    type: Array,
  },
  'questions.$': {
    type: Object,
    blackbox: true,
  },
  totalTime: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  points: {
    type: Number,
    defaultValue: 0
  },
  correctAnswer: {
    type: Number,
    defaultValue: 0,
  },
  wrongAnswer: {
    type: Number,
    defaultValue: 0,
  },
  givenAnswer: {
    type: Number,
    defaultValue: 0,
  },
  accuracy: {
    type: Number,
    defaultValue: 0,
  },
  isQuit: {
    type: Boolean,
    defaultValue: false,
  },
  isCompleted: {
    type: Boolean,
    defaultValue: false,
  },
  isWin: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
});

PlayedSessions.attachSchema(Schemas.QuizRoom);