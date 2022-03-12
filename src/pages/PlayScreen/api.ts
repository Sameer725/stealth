import fireStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {TranslationData} from '@types';
import {useEffect, useState} from 'react';

export interface DataType {
  sentence: string;
  word: string;
  translateId: FirebaseFirestoreTypes.CollectionReference<DataType>;
}

export const useGetDocumentIds = (language: 'English' | 'German') => {
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  useEffect(() => {
    const listen = fireStore()
      .collection(language)
      .onSnapshot(snapShot => {
        let ids: string[] = [];

        snapShot.forEach(doc => ids.push(doc.id));

        if (ids.length === snapShot.size) {
          setDocumentIds(ids);
        }
      });

    return () => {
      listen();
    };
  }, [language]);

  return documentIds;
};

const initialData: TranslationData = {
  translate: {
    sentence: '',
    word: '',
  },
  translation: {
    sentence: '',
    word: '',
  },
};

export const useGetDocument = (
  documentId: string,
  language: 'English' | 'German',
) => {
  const [data, setData] = useState<TranslationData>(initialData);

  useEffect(() => {
    const listen = fireStore()
      .collection(language)
      .doc(documentId)
      .onSnapshot(snapShot => {
        let {translateId, ...translate} = snapShot.data() as DataType;
        translateId.onSnapshot(translationSnapshot => {
          const translation = translationSnapshot.data();

          setData({translate, translation});
        });
      });

    return () => {
      listen();
    };
  }, [documentId, language]);

  return data;
};
