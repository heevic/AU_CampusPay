import {MongoClient} from 'mongodb'

/** ### Connect MongoDB */
const url = process.env.MONGODB_URL;
if (!url) {
    throw new Error('The MONGODB_URL environment variable is not defined')
}


/** ### connectDB를 선언. Type : Promise<MongoClient> */
let connectDB: Promise<MongoClient>;

/** ### 현재 환경이 개발 환경인지 확인. */
if (process.env.NODE_ENV === 'development') {
    /** ### 전역 _mongo 변수가 설정되어 있지 않다면 새로운 MongoDB 연결을 설정. */
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect()
    }
    /** ### _mongo 변수가 설정되어 있으면 재사용해서 connectDB에 할당 */
    connectDB = global._mongo
} else {
    /** ### 개발 환경이 아니면 새로운 MongoDB 연결을 생성해 connectDB에 할당 */
    connectDB = new MongoClient(url).connect()
}
export {connectDB}