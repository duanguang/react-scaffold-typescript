import { ProModalForm } from '@legions/pro-design/es/LegionsProModalForm/interface';
import { ProModal,ProTable,ProForm,LegionsProForm } from "@legions/pro-design"
import { ClassOf } from "@legions/pro-design/es/interface";
import { IAntdRule } from "@legions/pro-design/es/interface/antd";
import { useEffect,useRef,useState } from "react"
declare type IFormRules<FormRules> = {
    [P in keyof FormRules]: IAntdRule[];
};
declare type typeFields<fields> = {
    [P in keyof fields]: string;
};
interface EditOption {
    title?: string;
    width?: number;
}
// ProConditions.conditionsModel[]
export const useForm = <T>(option: {
    onAddFormItems: (config: InstanceType<typeof LegionsProForm['utils']>,rule: IFormRules<T>) => void;
    onModalFormReady?: (val: ProModalForm.ref) => void;
    onReady?: (val: ProForm.ref) => void;
    inputDataModel: ClassOf<T>;
    onSubmit?: (errors: any,val: T) => void;
}) => {
    const formUtils = new LegionsProForm.utils();
    const rules = formUtils.initFormRules(option.inputDataModel)
    option.onAddFormItems(formUtils,rules);
    const _ref = useRef<ProForm.ref>(null);
    const _modal_ref = useRef<ProModal.ref>(null);
    const editState = useRef<'add' | 'edit'>('add')
    const editRowId = useRef<string>('')
    const onModalFormReady = (val: ProModalForm.ref) => {
        _modal_ref.current = val.modal_ref;
        _modal_ref.current.width = 550;
        _ref.current = val.form_ref;
        option.inputDataModel['ref'] = _ref.current;
        option?.onModalFormReady?.(val);
    }
    const onReady = (val: ProForm.ref) => {
        _ref.current = val;
        option.inputDataModel['ref'] = _ref.current;
        option?.onReady?.(_ref.current);
    }
    const onSubmit = () => {
        _ref.current.form.validateFields((error,values) => {
            option?.onSubmit?.(error,values);
        })
    }
    const fields = new option.inputDataModel() as typeFields<T>
    Object.keys(fields).map((key) => {
        Object.defineProperty(fields,key,{
            get: () => {
                return key;
            }
        })
    })
    const onBeforeEdit = (edit_type: 'add' | 'edit',option?: EditOption) => {
        let _option = option || {} as EditOption;
        if (_modal_ref.current) {
            _modal_ref.current.title = _option.title || '编辑';
            if (_option.width) {
                _modal_ref.current.width = _option.width;
            }
            _modal_ref.current.visible = true;
        }
        editState.current = edit_type;

    }
    const onAfterEdit = () => {
        if (_modal_ref.current) {
            _modal_ref.current.visible = false
        }
        editRowId.current = '';
        editState.current = null;
    }
    return {
        items: formUtils.configs,
        ref: _ref,
        modal_ref: _modal_ref,
        target_form_data: _ref.current?.target_form_data as T,
        /** 模态框表单实例加载完回调事件 */
        onModalFormReady,
        /** 表单实例加载完回调事件 */
        onReady,
        /** 表单实体 */
        inputDataModel: option.inputDataModel,
        /** 提交 */
        onSubmit,
        /** 表单字段信息集 */
        fields,
        /** 表单操作类型.譬如添加,编辑 */
        editState,
        editRowId,
        /** 编辑数据前执行方法 */
        onBeforeEdit,
        /** 编辑数据后执行方法,主要关闭模态框，清理临时存储数据 */
        onAfterEdit
    }
}
