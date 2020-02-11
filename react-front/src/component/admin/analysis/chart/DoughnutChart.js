import React, {Component} from "react";
import Chart from "chart.js";
import 'chartjs-plugin-datalabels';

class DoughnutChart extends Component {
    chart = null;
    canvas=null;

    draw(){
        //새로 그려질 때 기존 인스턴스 제거
        if (this.chart){
            this.chart.destroy();
            this.chart = null;
        }

        const {data,selected,title,label}=this.props;

        const config = {
            type: "doughnut",
            data: {
                labels: label,
                datasets: [
                    {
                       
                        data: data,
                        fill: false,
                        backgroundColor: ['#ffe066','#ff8787','#e599f7','#66d9e8','#ffc078'],
                        borderColor: ['#ffe066','#ff8787','#e599f7','#66d9e8','#ffc078'],
                        lineTension: 0,
                        pointRadius: 0
                    }
                ]
                
            },

            options: {
                responsive: true,
                title: {
                    display: true,
                    text: selected+title,
                    fontSize: 25
                },
                legend:{
                    labels:{
                        fontSize: 20,
                        padding: 20
                    }
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                plugins: {
                    datalabels: {
                        color: '#111',
                        textAlign: 'center',
                        font: {
                            lineHeight: 1.6,
                            size:16
                        },
                        display: function(context) {
                            var index = context.dataIndex;
                            var value = context.dataset.data[index];
                            return value > 0; // display labels with a value greater than 0
                        },
                        formatter: function(value, ctx) {
                            return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value+'명';
                        }
                    }
                }
            }
        };

        const ctx=this.canvas.getContext("2d"); //2d 그래픽 드로잉 컨텍스트에 엑세스.
        this.chart = new Chart(ctx, config); //chart.js 사용(라이브러리 필요.) -> ctx를 첫번째 argument로 넘겨주고, 두번째 argument로 그림을 그릴때 필요한 요소들을 모두 넘겨줍니다.
    }

    componentDidMount(){
        this.draw();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.draw();
        }
    }

    componentWillUnmount(){
        //컴포넌트가 사라질 때 인스턴스 제거
        if(this.chart){
            this.chart.destroy();
        }
    }

    render(){
        return (
            <div className="DoughnutChart">
                {/*
                ref를 통해서 실제 DOM에 대한 접근
                */}
                <div className="chart-container" style={{width:"60vw", margin: "auto"}}>
                    <canvas ref={ref => (this.canvas=ref)}></canvas>
                </div>
            </div>
        );
    }
}

export default DoughnutChart;