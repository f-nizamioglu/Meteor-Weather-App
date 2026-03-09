import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="skeleton-wrapper" aria-label="Loading weather data">
            {/* City name skeleton */}
            <div className="skeleton-line skeleton-city stagger-1" />
            <div className="skeleton-line skeleton-condition stagger-1" />

            {/* Main card skeleton */}
            <div className="skeleton-card stagger-2">
                <div className="skeleton-circle" />
                <div className="skeleton-line skeleton-temp" />
            </div>

            {/* Detail cards skeleton */}
            <div className="skeleton-details stagger-3">
                <div className="skeleton-detail-card" />
                <div className="skeleton-detail-card" />
                <div className="skeleton-detail-card" />
            </div>
        </div>
    );
};

export default SkeletonLoader;
