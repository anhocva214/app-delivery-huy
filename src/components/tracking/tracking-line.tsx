import { Flex, Image, Text } from 'native-base';
import React from 'react';
import { Img } from '../../utils/img';

interface IProps {
  address: string;
  type: 'processing' | 'done';
  disabled?: boolean;
  time?: string;
}

export default function TrackingLine({ address, time, disabled, type }: IProps) {
  return (
    <Flex flexDirection={'row'} alignItems={'center'} style={{ gap: 10 }}>
      {type == 'processing' ? (
        <Image
          source={disabled ? Img.icRecordCircleDisabled : Img.icRecordCircle}
          alt="icon"
          size={6}
        />
      ) : (
        <Image source={disabled ? Img.icLocationDisabled : Img.icLocation} alt="icon" size={6} />
      )}

      <Flex>
        <Text color={disabled ? '#A7A9B7' : '#191D31'} fontWeight={'semibold'}>
          {address}
        </Text>
        {time && <Text color="#A7A9B7">{time}</Text>}
      </Flex>
    </Flex>
  );
}
