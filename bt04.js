
const { MongoClient } = require('mongodb');

// Kết nối MongoDB trên máy local
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log('Kết nối MongoDB thành công!');

        // Chọn database và collection
        const db = client.db('qlsinhvien');
        const collection = db.collection('students');

        // Danh sách sinh viên
        const students = [
            {
                masv: 'SV001',
                hoten: 'Nguyễn Hoàng Hải',
                tuoi: 20,
                diem: 8.5
            },
            {
                masv: 'SV002',
                hoten: 'Trần Quốc Huy',
                tuoi: 21,
                diem: 9.0
            },
            {
                masv: 'SV003',
                hoten: 'Phạm Hoàng Hải',
                tuoi: 19,
                diem: 7.5
            }
        ];

        // Thêm nhiều sinh viên bằng insertMany()
        const result = await collection.insertMany(students);

        console.log(`Đã thêm ${result.insertedCount} sinh viên thành công!`);

        // Hiển thị danh sách sinh viên bằng find()
        console.log('\nDANH SÁCH SINH VIÊN:');

        const cursor = collection.find();

        for await (const student of cursor) {
            console.log(student);
        }

    } catch (error) {
        console.error('Lỗi:', error);
    } finally {
        // Đóng kết nối MongoDB
        await client.close();
        console.log('\nĐã đóng kết nối MongoDB!');
    }
}

main();
