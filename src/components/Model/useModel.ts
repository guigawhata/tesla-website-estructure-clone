import { useCallback, useContext, useEffect } from 'react';
import ModelsContext, { CarModel } from './ModelsContext';

interface UseModel {
  registerModel: (model: CarModel) => void;
  getModel: () => CarModel | null;
}

export default function useModel(modelName: string): UseModel {
  const { registerModel, unregisterModel, getModelByName } = useContext(
    ModelsContext,
  );

  useEffect(() => {
    return () => unregisterModel(modelName);
  }, [unregisterModel, modelName]);

  const getModel = useCallback(() => getModelByName(modelName), [
    getModelByName,
    modelName,
  ]);

  return { registerModel, getModel };
}
