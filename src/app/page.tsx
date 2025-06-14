"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">shadcn/ui Dialog Demo</h1>
          <p className="text-muted-foreground">基本的なダイアログコンポーネントのデモページです</p>
        </div>

        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>基本的なダイアログを開く</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>基本的なダイアログ</DialogTitle>
                <DialogDescription>
                  これはshadcn/uiのDialogコンポーネントのサンプルです。
                  ダイアログの内容をここに記述できます。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">確認ダイアログ</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>確認が必要です</DialogTitle>
                <DialogDescription>
                  この操作を実行しますか？この操作は元に戻すことができません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">キャンセル</Button>
                <Button variant="destructive">実行</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">フォームダイアログ</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>プロフィール編集</DialogTitle>
                <DialogDescription>
                  プロフィール情報を編集してください。完了したら保存ボタンを押してください。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    名前
                  </label>
                  <input
                    id="name"
                    defaultValue="山田太郎"
                    className="col-span-3 px-3 py-2 border border-input rounded-md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right text-sm font-medium">
                    メール
                  </label>
                  <input
                    id="email"
                    defaultValue="yamada@example.com"
                    className="col-span-3 px-3 py-2 border border-input rounded-md"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">変更を保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
