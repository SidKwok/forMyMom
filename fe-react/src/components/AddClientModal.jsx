import React from 'react';

import { Modal, Form, Input } from 'antd';

export default Form.create()(
    (props) => {
        const { form, onOk } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 }
        };
        const formGroup = [
            { label: '姓名', key: 'name' },
            { label: '地址', key: 'address' },
            { label: '移动电话', key: 'mobilephone' },
            { label: '固定电话', key: 'telephone' },
            { label: '备注', key: 'note' }
        ];
        return (
            <Modal
                {...props}
                title='添加客户'
                width={400}
                onOk={onOk(form)}
                >
                <Form>
                    {formGroup.map(({ label, key, rules }) => (
                        <Form.Item
                            key={key}
                            label={label}
                            {...formItemLayout}
                            >
                            {getFieldDecorator(key, {
                                rules: [{ required: true, message: `请输入${label}` }]
                            })(
                                key === 'note' ? <Input type='textarea' rows={3} /> : <Input />
                            )}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        );
    }
);
