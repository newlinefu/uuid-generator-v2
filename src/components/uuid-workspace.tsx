import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { uuidv7 } from "uuidv7";

const UUID_VERSIONS = {
  V1: "v1",
  V4: "v4",
  V7: "v7",
};

const generateUuid = {
  [UUID_VERSIONS.V1]: uuidv1,
  [UUID_VERSIONS.V4]: uuidv4,
  [UUID_VERSIONS.V7]: uuidv7,
};

const UuidWorkspace = () => {
  const [selectedVersion, setSelectedVersion] = useState(UUID_VERSIONS.V4);
  const [mainUuid, setMainUuid] = useState(generateUuid[selectedVersion]());
  const [bulkCountInputValue, setBulkCountInputValue] = useState("");
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);

  const onMainGenerateClick = useCallback(() => {
    const newUuid = generateUuid[selectedVersion]();
    setMainUuid(newUuid);
  }, [selectedVersion]);

  const onBulkGenerateClick = () => {
    const countOfGeneratedUuid = Number(bulkCountInputValue || 0);
    const generatedUuids: string[] = [];
    for (let i = 0; i < countOfGeneratedUuid; i++) {
      generatedUuids.push(generateUuid[selectedVersion]());
    }
    setBulkUuids(generatedUuids);
  };

  useEffect(() => {
    onMainGenerateClick();
    setBulkUuids([]);
    setBulkCountInputValue("");
  }, [selectedVersion, onMainGenerateClick]);

  const onBulkInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (Number.isInteger(+value) && value.length <= 2) {
      setBulkCountInputValue(value);
    }
  };

  return (
    <WorkspaceWrapper>
      <MainUuidWrapper>
        <MainUuidLabel id="uuid-label">Сгенерированный UUID:</MainUuidLabel>
        <MainUuidValue id="uuid-container">{mainUuid}</MainUuidValue>
        <MainUuidControls>
          <button id="generate-uuid-button" onClick={onMainGenerateClick}>
            Сгенерировать
          </button>
          <button
            id="copy-uuid-button"
            onClick={() => {
              navigator.clipboard.writeText(mainUuid);
            }}
          >
            Скопировать
          </button>
        </MainUuidControls>
      </MainUuidWrapper>

      <RadioButtonsGroup>
        <legend id="select-uuid-version-label">Выберите версию UUID</legend>

        <SingleRadioOptionWrapper id="uuid-version-selection-v1">
          <input
            type="radio"
            id="v1"
            value={UUID_VERSIONS.V1}
            checked={selectedVersion === UUID_VERSIONS.V1}
            onChange={() => {
              setSelectedVersion(UUID_VERSIONS.V1);
            }}
          />
          <label htmlFor="v1">version 1 UUID</label>
        </SingleRadioOptionWrapper>

        <SingleRadioOptionWrapper id="uuid-version-selection-v4">
          <input
            type="radio"
            id="v4"
            value={UUID_VERSIONS.V4}
            checked={selectedVersion === UUID_VERSIONS.V4}
            onChange={() => {
              setSelectedVersion(UUID_VERSIONS.V4);
            }}
          />
          <label htmlFor="v4">version 4 UUID</label>
        </SingleRadioOptionWrapper>

        <SingleRadioOptionWrapper id="uuid-version-selection-v7">
          <input
            type="radio"
            id="v7"
            value={UUID_VERSIONS.V7}
            checked={selectedVersion === UUID_VERSIONS.V7}
            onChange={() => {
              setSelectedVersion(UUID_VERSIONS.V7);
            }}
          />
          <label htmlFor="v7">version 7 UUID</label>
        </SingleRadioOptionWrapper>
      </RadioButtonsGroup>
      <BulkUuidGenerationWrapper>
        <BulkUuidGenerationControlsWrapper>
          <input
            type="text"
            placeholder="10"
            id="uuid-count-field"
            value={bulkCountInputValue}
            onChange={onBulkInputChange}
          />
          <button onClick={onBulkGenerateClick} id="uuid-count-generate">
            Сгенерировать
          </button>
        </BulkUuidGenerationControlsWrapper>
      </BulkUuidGenerationWrapper>
      <BulkUuidGenerationResultList id="multiple-uuid-generated-wrapper">
        {bulkUuids.map((item) => (
          <BulkUuidGenerationResultListItem
            key={item}
            className="bulk-uuid-item"
          >
            {item}
          </BulkUuidGenerationResultListItem>
        ))}
      </BulkUuidGenerationResultList>
    </WorkspaceWrapper>
  );
};

const WorkspaceWrapper = styled.div`
  padding: 12px;
`;

const MainUuidWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  background-color: darkgrey;
  border-radius: 12px;
  padding: 10px;
  justify-content: space-around;
`;

const MainUuidLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainUuidValue = styled.div`
  background-color: black;
  border-radius: 6px;
  color: aliceblue;
  padding: 5px;
`;

const MainUuidControls = styled.div`
  display: flex;
  gap: 6px;
`;

const RadioButtonsGroup = styled.fieldset`
  margin: 10px 0;
`;

const SingleRadioOptionWrapper = styled.div`
  padding: 5px 10px;

  & label {
    padding-left: 10px;
  }
`;

const BulkUuidGenerationWrapper = styled.div``;

const BulkUuidGenerationControlsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const BulkUuidGenerationResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
`;

const BulkUuidGenerationResultListItem = styled.div``;

export default UuidWorkspace;
