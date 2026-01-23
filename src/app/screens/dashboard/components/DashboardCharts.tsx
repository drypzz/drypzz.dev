"use client";

import React from 'react';
import {
    BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell,
    CartesianGrid, AreaChart, Area
} from 'recharts';

const COLORS = ['#7c3aed', '#06b6d4', '#2563eb', '#a855f7', '#22d3ee'];

interface ChartsProps {
    data: {
        techDistribution: { name: string; value: number }[];
        timelineData: { name: string; projetos: number }[];
    }
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl">
                <p className="text-white font-sans font-bold text-sm mb-1">{label}</p>
                <p className="text-gray-400 font-mono text-xs">
                    <span style={{ color: payload[0].color }} className="mr-2">●</span>
                    {payload[0].value} {payload[0].dataKey === 'projetos' ? 'Projetos' : 'Uso'}
                </p>
            </div>
        );
    }
    return null;
};

const DashboardCharts: React.FC<ChartsProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            <div className="border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-electric-violet/20 transition-colors flex flex-col">

                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-electric-violet/10 flex items-center justify-center border border-electric-violet/20">
                        <div className="w-4 h-4 bg-electric-violet rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                    </div>
                    <div>
                        <h3 className="text-white font-sans font-bold text-lg">Top Tecnologias</h3>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-wider">Stacks mais utilizadas</p>
                    </div>
                </div>

                <div className="h-[300px] w-full min-w-0 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.techDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#4b5563"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => val.toUpperCase().slice(0, 4)}
                                dy={10}
                                fontFamily="monospace"
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                {data.techDistribution.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-electric-violet/5 blur-[100px] rounded-full pointer-events-none" />
            </div>

            <div className="border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-neon-cyan/20 transition-colors flex flex-col">

                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                        <div className="w-4 h-4 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    </div>
                    <div>
                        <h3 className="text-white font-sans font-bold text-lg">Evolução</h3>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-wider">Crescimento do portfólio</p>
                    </div>
                </div>

                <div className="h-[300px] w-full min-w-0 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorProjetos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#4b5563"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                fontFamily="monospace"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="projetos"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorProjetos)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none" />
            </div>
        </div>
    );
};

export default DashboardCharts;