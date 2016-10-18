-Mục đích của project này dùng để tra cứu thông tin tự dộng về quy chế nội quy nhà trường,
mở rộng ra sẽ là tra cứu tiếng anh,công nghệ

-Project viết trên nền Mean Js và sẽ open source

-Tránh gặp lỗi khi clone project về chạy lệnh

```sh
$ npm install
```

-Để chạy sử dụng lệnh

```sh
$ npm start
```

Để export database (nên export ra file json) 
```sh
$ mongoexport -d DatabaseName -c CollectionName -o extension
```

Để import database (nên import ra file json) 
```sh
$ mongoimport -d DatabaseName -c CollectionName -o extension
```