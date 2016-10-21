-Mục đích của project này dùng để tra cứu thông tin tự dộng về quy chế nội quy nhà trường sử dụng chat bot trả lời tự động,
mở rộng ra sẽ cho phép người dùng tra cứu tiếng anh,công nghệ

-Project viết trên nền Mean Js và sẽ phát triển theo hướng open source

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
$ mongoexport -d ChatBot -c users -o user.json
```

Để import database (nên import bằng file json)
```sh
$ mongoimport -d ChatBot -c users user.json
```
![](Note/meanjs.jpg)
![](Note/nodejs.jpg)