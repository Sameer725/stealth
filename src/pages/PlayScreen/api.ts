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

export const useGetDocumentIds = () => {
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  useEffect(() => {
    const listen = fireStore()
      .collection('English')
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
  }, []);

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

export const useGetDocument = (documentId: string) => {
  const [data, setData] = useState<TranslationData>(initialData);

  useEffect(() => {
    const listen = fireStore()
      .collection('English')
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
  }, [documentId]);

  return data;
};
