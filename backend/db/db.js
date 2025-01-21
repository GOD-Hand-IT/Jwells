import mongoose from 'mongoose';


const cn = 'postgres://postgres:@localhost:5432/userdb';


export default pgp({})(cn)
