const new_users = {
    form: {
        label: {
            code: "コード",
            first_name: "ファーストネーム",
            middle_name: "ミドルネーム",
            last_name: "苗字",
            username: "ユーザー名",
            password: "パスワード",
            confirm_password: "パスワードを認証する",
        },
        buttons: {
            save: "セーブ",
            edit: "編集",
            delete: "削除する",
            update: "更新",
            cancel: "キャンセル"
        },
        validation: {
            required: "(この項目は必須です.)",
            info: "情報",
            delete_account: "自分のアカウントを削除することはできません.",
            delete_confirmation: "消去してもよろしいですか ",
            deleted: "ユーザーが削除されました.",
            saved: "新しいユーザーアカウントが作成されました.",
            updated: "ユーザー情報が更新されました.",
            success: "成功",
            error: "エラー: ",
            ok: "はい"
        }
    }
}

export default new_users
