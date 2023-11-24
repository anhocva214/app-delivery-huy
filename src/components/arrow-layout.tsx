import { Flex, Image, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Img } from '../utils/img';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  children: React.ReactNode;
  title?: string;
  hiddenIconRight?: boolean;
}

export default function ArrowLayout({
  children,
  title,
  hiddenIconRight,
}: IProps) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Flex
        flexDirection="row"
        justify="space-between"
        align="center"
        px="5"
        py="3"
      >
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={Img.icBack} size={7} alt="icon" />
        </TouchableOpacity>
        {title && (
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
        )}
        {hiddenIconRight ? (
          <View w={7} />
        ) : (
          <TouchableWithoutFeedback>
            <Image source={Img.icMore} size={7} alt="icon" />
          </TouchableWithoutFeedback>
        )}
      </Flex>

      {children}
    </SafeAreaView>
  );
}
