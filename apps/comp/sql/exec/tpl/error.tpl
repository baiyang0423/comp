<p title="{{data.entity.sql}}" style="color: green;padding-right:60px">{{data.entity.name}},执行时间:{{data.entity.executeTime}}. 提示:鼠标移到此区域将展示执行的SQL内容.</p>

<div class="pd-10 clear animation-right">
    <div class="approval-table fs-14">
        <table>
            <thead>
                 <tr>
                    <th>SQL</th>
                    <th>出错原因</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{data.entity.sql}}</td>
                    <td>{{retMsg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
<div>
<div style="height: 40px;"></div>