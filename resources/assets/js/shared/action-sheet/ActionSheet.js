import { ActionSheet } from 'native-base'


const deleteSelection = [
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
]


export const actionSheetDelete = (title, functionProcess) => {
    ActionSheet.show(
        {
            options: deleteSelection,
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
            title: title
        },
        buttonIndex => {
            if (deleteSelection[buttonIndex].text == 'Delete')
                return functionProcess()
        }
    )
}