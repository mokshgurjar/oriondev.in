'use client'

import { useState } from 'react'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import SectionTitle from '@/components/ui/SectionTitle'
import { COMPARISON_COLS, COMPARISON_ROWS } from '@/lib/data'
import { cn } from '@/lib/utils'

// Shared cell style
const cellBase: React.CSSProperties = {
    padding: '16px 20px',
    border: '1px solid var(--color-border-DEFAULT)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
}

function CompareRow({ row }: { row: (typeof COMPARISON_ROWS)[number] }) {
    const [hovered, setHovered] = useState(false)

    return (
        <tr
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* td:first-child — text-align left, text, 12px */}
            <td
                style={{
                    ...cellBase,
                    textAlign: 'left',
                    color: 'var(--color-text-DEFAULT)',
                    fontSize: '12px',
                    background: hovered ? 'var(--color-red-dim)' : 'transparent',
                }}
            >
                {row.feature}
            </td>
            {row.values.map((val, i) => (
                <td
                    key={i}
                    style={{
                        ...cellBase,
                        background: hovered ? 'var(--color-red-dim)' : 'transparent',
                    }}
                >
                    {val === true ? (
                        /* .check: red-bright */
                        <span style={{ color: 'var(--color-red-bright)' }}>✦</span>
                    ) : val === false ? (
                        /* .dash: text-low */
                        <span style={{ color: 'var(--color-text-low)' }}>—</span>
                    ) : (
                        <span style={{ color: 'var(--color-text-mid)' }}>{val}</span>
                    )}
                </td>
            ))}
        </tr>
    )
}

export default function Compare() {
    return (
        <section
            id="compare"
            style={{ padding: '120px 0' }}
        >
            <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>

                <SectionEyebrow>Honest comparison</SectionEyebrow>
                <SectionTitle>
                    How Orion stacks up.
                </SectionTitle>

                {/* .compare-table-wrapper: overflow-hidden, rounded styling */}
                <div
                    className={cn(
                        "overflow-x-auto rounded-xl bg-bg-card",
                        "transition-all duration-300"
                    )}
                    style={{
                        border: '1px solid var(--color-border-DEFAULT)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-red-deep)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-DEFAULT)'
                    }}
                >
                    {/* .compare-table: width 100%, border-collapse collapse, mono, 12px */}
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontFamily: 'var(--font-ui)',
                            fontSize: '13px',
                        }}
                    >
                        <thead>
                            <tr>
                                {/* first header — "Feature" label */}
                                <th
                                    style={{
                                        ...cellBase,
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        color: 'var(--color-text-mid)',
                                        background: 'transparent',
                                        fontWeight: 500,
                                        textAlign: 'left',
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                    }}
                                >
                                    Feature
                                </th>
                                {COMPARISON_COLS.map((col, i) => (
                                    <th
                                        key={col}
                                        style={{
                                            ...cellBase,
                                            fontSize: '11px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            /* th.orion-header: red-bright */
                                            color: col === 'Orion'
                                                ? 'var(--color-red-bright)'
                                                : 'var(--color-text-mid)',
                                            background: 'transparent',
                                            fontWeight: 500,
                                            borderTop: 'none',
                                            borderRight: i === COMPARISON_COLS.length - 1 ? 'none' : '1px solid var(--color-border-DEFAULT)',
                                        }}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <CompareRow key={row.feature} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    )
}
