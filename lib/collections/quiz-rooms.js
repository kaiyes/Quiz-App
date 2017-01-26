/**
 * Created by zahed on 1/22/17.
 */
import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';

const Schemas = {};

export default QuizRooms = new Mongo.Collection('quizRooms');

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
  totalPoint: {
    type: Number,
    defaultValue: 0,
  },
  totalTime: {
    type: Number,
    defaultValue: 0,
  },
  isCompleted: {
    type: Boolean,
    defaultValue: false,
  }
});

Schemas.QuizRoom = new SimpleSchema({
  challenger: {
    type: Schemas.Contestent,
  },
  defender: {
    type: Schemas.Contestent,
  },
  questions: {
    type: Array,
  },
  'questions.$': {
    type: Object,
    blackbox: true,
  },
  isFirst: {
    type: Boolean,
    defaultValue: false,
  },
  course: {
    type: String
  },
  chapter: {
    type: String
  },
  status: {
    type: String,
    allowedValues: ['pending', 'running', 'incomplete', 'completed', 'rejected'],
    defaultValue: 'pending',
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

QuizRooms.attachSchema(Schemas.QuizRoom);