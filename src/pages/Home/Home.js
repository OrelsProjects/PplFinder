import React, {useState} from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [selectedCountryCodes, setSelectedCountryCodes] = useState([]);
  const { users, isLoading } = usePeopleFetch(selectedCountryCodes);

  /**
   * When a country checkbox is either checked or unchecked
   * this function will be called with the relevant country codes.
   */
  const onCountrySelectionChanged = (countryCodes) => {
    setSelectedCountryCodes(countryCodes);
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} onCountryChange = {onCountrySelectionChanged} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
