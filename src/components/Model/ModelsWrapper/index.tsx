import React, { useCallback, useRef, useState } from 'react';
import ModelOverlay from '../ModelOverlay';
import ModelsContext, { CarModel } from '../ModelsContext';

import { Container, OverlayRoot } from './styles';

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  const registerModel = useCallback((model: CarModel): void => {
    setRegisteredModels(state => [...state, model]);
  }, []);

  const unregisterModel = useCallback((modelName: string): void => {
    setRegisteredModels(state =>
      state.filter(model => model.modelName !== modelName),
    );
  }, []);

  const getModelByName = useCallback(
    (modelName: string): CarModel | null => {
      return (
        registeredModels.find(model => model.modelName === modelName) || null
      );
    },
    [registeredModels],
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlayRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlayRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
