const SideBarMenuItems = {

	schedule_management: {
		name: trans => trans.t('nav.schedule_management.title'),
		icon: 'ios-speedometer',
		route: '',
		childrens: [
			{
				name: trans => trans.t('nav.schedule_management.schedule'),
				icon: 'ios-speedometer',
				route: 'DefaultPage'
			},
			{
				name: trans => trans.t('nav.schedule_management.employee_schedule'),
				icon: 'ios-person',
				route: 'DefaultPage'
			}
		]
	},
	finished_conversations: {
		name: trans => trans.t('nav.finished_conversation'),
		icon: 'ios-book',
		route: 'DefaultPage',
	},
	user_management: {
		name: trans => trans.t('nav.user_management.title'),
		icon: 'people',
		route: '',
		childrens: [
			{ 
				name: trans => trans.t('nav.user_management.users'),
				icon: 'ios-person-add',
				route: 'UsersPage'
			},
			{
				name: trans => trans.t('nav.user_management.upload_users'),
				icon: 'people',
				route: 'DefaultPage'
			}	
		]
	},	
	category_management: {
		name: trans => trans.t('nav.category_management'),
		icon: 'ios-book',
		route: 'DefaultPage',
	},
	conversation_management: {
		name: trans => trans.t('nav.conversation_management.title'),
		icon: 'ios-chatboxes',
		route: '',
		childrens: [
			{
				name: trans => trans.t('nav.conversation_management.employee_conversation'),
				icon: 'ios-chatboxes',
				route: 'DefaultPage'
			}
		]
	},
}

export default SideBarMenuItems