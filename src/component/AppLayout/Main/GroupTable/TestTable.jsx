import React from "react";
import { Table, Icon, Button } from "antd";
import AbstractEditableTable from "../AbstractEditableTable";
import { CommandTable } from "./TestTable/CommandTable";
import { EditableCell } from "../EditableCell";
import ErrorBoundary from "component/ErrorBoundary";
import { connectDnD } from "../DragableRow";

const recordPrefIcon = <Icon type="bars" title="Test" />;

@connectDnD
export class TestTable extends AbstractEditableTable {

  constructor( props ) {
    super( props );
    this.columns = [
      {
        title: "Test",
        dataIndex: "title",
        width: "calc(100% - 160px)",
        render: ( text, record ) => (
          <EditableCell
            prefixIcon={ recordPrefIcon }
            record={ record }
            dataIndex="title"
            placeholder="Describe the assertions you want to perform"
            liftFormStateUp={ this.liftFormStateUp }
            updateRecord={ this.updateRecord }
          />
        )
      },
      this.getActionColumn()
    ];

  }

  fields = [ "title" ];

  model = "Test";

  onExpand = ( isExpanded, record ) => {
    const expanded = { ...this.props.expanded };
    expanded[ record.groupId ].tests[ record.id ] = {
      key: record.key,
      value: isExpanded
    };
    this.props.action.setProject({
      groups: expanded
    });
  }

  renderExpandedTable = ( test ) => {
    const commands = test.commands ? Object.values( test.commands ) : [],
          targets = this.props.targets;
    return ( <CommandTable commands={commands}
      targets={targets}
      testId={test.id}
      groupId={test.groupId} action={this.props.action} /> );
  }

  selectExpanded() {
    const { groupId, expanded } = this.props;
    if ( !expanded.hasOwnProperty( groupId ) ) {
      return [];
    }
    return Object.values( expanded[ groupId ].tests )
      .filter( item => Boolean( item.value ) )
      .map( item => item.key );
  }

  render() {
    const { tests } = this.props,
          expanded = this.selectExpanded();
    return (
      <ErrorBoundary>
        <Table
          className="draggable-table"
          components={this.components}
          onRow={this.onRow}
          rowClassName="model--test"
          expandedRowRender={ this.renderExpandedTable }
          defaultExpandedRowKeys={ expanded }
          showHeader={ false }
          dataSource={ tests }
          columns={ this.columns }
          onExpand={ this.onExpand }
          pagination={ false }
          footer={() => ( <Button onClick={ this.addRecord }><Icon type="plus" />Add a test</Button> )}
        />
      </ErrorBoundary>
    );
  }
}