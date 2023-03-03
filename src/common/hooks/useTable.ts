import { LegionsProConditions, ProConditions, ProTable } from "@legions/pro-design"
import { useEffect,useRef,useState } from "react"
// ProConditions.conditionsModel[]
export const useTableList = (option: {
    onAddQuery: (config: InstanceType<typeof LegionsProConditions['ProConditionsUtils']>) => void;
    onAddColumns: () => ProTable.ColumnProps<any>[];
    onTableReady?: (val:ProTable.ref) => void;
    onConditionReady?: (val:ProConditions.ref) => void;
}) => {
    const _conditions = new LegionsProConditions.ProConditionsUtils();
    option.onAddQuery(_conditions);
    const _columns = option.onAddColumns();
    const _ref = useRef<ProTable.ref>(null);
    const _condition_ref = useRef<ProConditions.ref>(null);
    const onTableReady = (val: ProTable.ref) => {
        _ref.current = val;
        option?.onTableReady?.(_ref.current);
    }
    const onConditionReady = (val: ProConditions.ref) => {
        _condition_ref.current = val;
        option?.onConditionReady?.(_condition_ref.current);
    }
    return {
        conditions: _conditions.configs,
        columns: _columns,
        ref: _ref,
        condition_ref:_condition_ref,
        onTableReady,
        onConditionReady,
    }
}
