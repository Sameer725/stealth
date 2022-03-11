import React, {useCallback, useMemo, useState} from 'react';

import {
  BlankElement,
  BottomSheet,
  Box,
  Command,
  ContinueButton,
  NormalText,
  PlaceHolderComponent,
  Selection,
  SelectionItem,
  Translate,
  Translation,
} from '@components';

import {usePlayScreenAnswer, usePlayScreenMeasures} from './hooks';
import {useGetDocument, useGetDocumentIds} from './api';

export const PlayScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const documentIds = useGetDocumentIds();
  const data = useGetDocument(documentIds[activeIndex]);

  const {answerStatus, onButtonPress, onItemPress, selectedAnswer, statusData} =
    usePlayScreenAnswer(data);

  const {
    blankMeasure,
    getBlankMeasure,
    getSelectionMeasures,
    selectionMeasures,
  } = usePlayScreenMeasures(data);

  const selectionTranslateLayout = useMemo(() => {
    if (selectedAnswer.index !== -1 && blankMeasure) {
      const selection = selectionMeasures[selectedAnswer.index];

      return {
        item: {label: selectedAnswer.answer},
        layout: {
          x: blankMeasure.pageX - selection.pageX,
          y: blankMeasure.pageY - selection.pageY - 14,
        },
      };
    }
    return {item: {label: ''}, layout: {x: 0, y: 0}};
  }, [selectedAnswer, selectionMeasures, blankMeasure]);

  const selectionRenderItem = useCallback(
    (label: string, index: number) => {
      const isSelected = label === selectedAnswer.answer;
      const disable = answerStatus === 'correct' || answerStatus === 'error';

      return (
        <React.Fragment key={label}>
          <PlaceHolderComponent
            measures={selectionMeasures}
            index={selectedAnswer.index}
          />
          <SelectionItem
            getMeasure={getSelectionMeasures}
            index={index}
            label={label}
            onItemPress={onItemPress}
            translateLayout={selectionTranslateLayout}
            buttonColor={
              isSelected
                ? statusData.selectionButtonColor
                : !isSelected && disable
                ? 'transparent'
                : 'white1'
            }
            textColor={
              isSelected ? statusData.selectionTextColor : 'background2'
            }
            disabled={disable}
          />
        </React.Fragment>
      );
    },
    [
      getSelectionMeasures,
      onItemPress,
      selectionMeasures,
      selectedAnswer,
      selectionTranslateLayout,
      statusData,
      answerStatus,
    ],
  );

  const translationRenderItem = useCallback(
    label => {
      return label === data.translation.word ? (
        <BlankElement
          itemWidth={selectionMeasures[0]?.width}
          getMeasure={getBlankMeasure}
          key={label}
        />
      ) : (
        <NormalText key={label} value={label} />
      );
    },
    [getBlankMeasure, selectionMeasures, data.translation.word],
  );

  const onPress = useCallback(() => {
    answerStatus === 'correct' &&
      setActiveIndex(state =>
        documentIds.length === state ? state : state + 1,
      );
    onButtonPress();
  }, [answerStatus, onButtonPress, documentIds]);

  return (
    <Box
      backgroundColor="background2"
      borderTopEndRadius="round"
      borderTopStartRadius="round"
      flex={1}
      justifyContent="space-between"
      marginTop="s30p">
      <Box alignItems="center">
        <Command command="Fill in the missing word!" />
        <Translate
          text={data.translate.sentence}
          textToTranslate={data.translate.word}
        />
        <Translation
          renderItem={translationRenderItem}
          text={data.translation.sentence}
        />
        <Selection
          data={data.translation?.options || []}
          renderItem={selectionRenderItem}
        />
      </Box>

      <Box>
        <ContinueButton
          buttonColor={statusData.buttonColors}
          disabled={selectedAnswer.answer === ''}
          label={statusData.buttonLabel}
          onPress={onPress}
          textColor={statusData.buttonLabelColor}
        />
        <BottomSheet
          color={statusData.bottomSheetColor}
          display={statusData.showBottomSheet}
          label={
            answerStatus === 'correct'
              ? 'Great Job!'
              : `Answer: ${data.translation.word}`
          }
        />
      </Box>
    </Box>
  );
};
