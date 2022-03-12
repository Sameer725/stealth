import {AnswerStateType} from '@types';

export const answerState: AnswerStateType = {
  idle: {
    buttonLabel: 'Continue',
    buttonColors: 'white3',
    buttonLabelColor: 'white1',
    showBottomSheet: false,
    bottomSheetColor: 'transparent',
    selectionButtonColor: 'white1',
    selectionTextColor: 'background2',
  },
  selected: {
    buttonLabel: 'Check Answer',
    buttonColors: 'success',
    buttonLabelColor: 'white1',
    showBottomSheet: false,
    bottomSheetColor: 'transparent',
    selectionButtonColor: 'white1',
    selectionTextColor: 'background2',
  },
  error: {
    buttonLabel: 'Continue',
    buttonColors: 'white1',
    buttonLabelColor: 'error1',
    showBottomSheet: true,
    bottomSheetColor: 'error1',
    selectionButtonColor: 'error1',
    selectionTextColor: 'white1',
  },
  correct: {
    buttonLabel: 'Continue',
    buttonColors: 'white1',
    buttonLabelColor: 'success',
    showBottomSheet: true,
    bottomSheetColor: 'success',
    selectionButtonColor: 'success',
    selectionTextColor: 'white1',
  },
};
