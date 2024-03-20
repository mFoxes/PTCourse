import { Button, Checkbox, Form, Input, Modal } from 'antd';
import form from 'antd/es/form';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { PostCreateDto } from '../../../../dto/postCreate/postCreate';
import { useAppDispatch } from '../../../../helpers/useAppDispatch';
import { createPost } from '../../../../stores/postsSlice';

interface IProps {
	onClose?: () => void;
	onSuccess?: () => void;
}

export const PostCreateModal = ({ onClose, onSuccess }: IProps) => {
	const [form] = useForm();

	const dispatch = useAppDispatch();

	const handleCancel = () => {
		onClose && onClose();
	};

	const handleSave = () => {
		form.submit();
	};

	const onFinish = async (value: PostCreateDto) => {
		console.log('value', value);
		await dispatch(createPost(value));
		onSuccess && onSuccess();
	};

	return (
		<Modal open={true} onCancel={handleCancel} onOk={handleSave}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item name='title' label='Заголовок'>
					<Input />
				</Form.Item>

				<Form.Item name='content' label='Текст'>
					<TextArea />
				</Form.Item>
			</Form>
		</Modal>
	);
};
