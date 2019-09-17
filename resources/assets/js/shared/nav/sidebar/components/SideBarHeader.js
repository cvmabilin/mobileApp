import React from 'react';
import { View, Image, StatusBar, TouchableOpacity } from 'react-native';
import logo from '../../../images/kadoubot.png'

const SideBarHeader = ({ navigateToCallback }) => (
	<TouchableOpacity onPress={() => navigateToCallback('mainPage')}>
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#28a745',
				paddingVertical: 28,
				paddingLeft: 17,
				paddingTop: StatusBar.currentHeight + 10,
				alignItems: 'center',
			}}
		>
			<Image
				source={logo}
				style={{
					resizeMode: 'stretch',
					flex: 1,
					height: 50
				}}
			/>
			{/* 
			Add title
			<Text style={{ color: '#FFF', paddingLeft: 9, fontSize: 16 }}>
				ReactiveSearch
			</Text> */}
		</View>
	</TouchableOpacity>
);

export default SideBarHeader;