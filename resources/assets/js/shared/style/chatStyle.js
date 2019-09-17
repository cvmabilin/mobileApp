import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    rowList: {
        flexDirection: 'row',
    },
    chatBottomMenu: {
        backgroundColor: 'whitesmoke'
    },
    chatBottomColor: {
        color: 'grey'
    },
	readChat: {
		borderLeftColor: '#428bca',
		borderLeftWidth: 4
	},
	whiteIcon: {
		color: '#f9f9f9'
	},
	unreadFont: {
		fontWeight: 'bold'
	},
	modalView: {
		backgroundColor: '#f9f9f9',
		padding: 5
	},
	modalText: {
		alignItems: 'center',
		fontWeight: 'bold' 
	},
	modalButton: {
		marginTop: 20
	},
	searchBarRight: {
		alignItems: 'center', 
		padding: 0
	},
	searchBarContainer: {
		padding: 0,
		width: '85%'
	},
	usersRowFront: {
		backgroundColor: 'whitesmoke',
		justifyContent: 'center',
		height: 45,
	},


    container: {
		backgroundColor: 'white',
		flex: 1
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {

		backgroundColor: 'whitesmoke',
		justifyContent: 'center',
		height: 70,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	successBtn: {
		backgroundColor: '#5cb85c',
	}
	,
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: '#f0ad4e',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#d9534f',
		right: 0
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
});