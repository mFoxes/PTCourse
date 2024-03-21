import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { User } from "../users/users.model";

export interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    createDate: Date;
    likeNum: number;
    userIdLikes: number[];
    dislikeNum: number;
    userIdDislikes: number[];
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @Column({ type: DataType.DATE })
    createDate: Date;

    @Column({ type: DataType.INTEGER })
    likeNum: number;

    @Column({ type: DataType.ARRAY(DataType.INTEGER) })
    userIdLikes: number[];

    @Column({ type: DataType.INTEGER })
    dislikeNum: number;

    @Column({ type: DataType.ARRAY(DataType.INTEGER) })
    userIdDislikes: number[];
}
