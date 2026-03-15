package com.example.demo.dto;

public class DashboardSummaryResponse {

    private long total;
    private long pending;
    private long inProgress;
    private long resolved;

    public DashboardSummaryResponse(long total, long pending,
                                    long inProgress, long resolved) {
        this.total = total;
        this.pending = pending;
        this.inProgress = inProgress;
        this.resolved = resolved;
    }

    public long getTotal() {
        return total;
    }

    public long getPending() {
        return pending;
    }

    public long getInProgress() {
        return inProgress;
    }

    public long getResolved() {
        return resolved;
    }
}