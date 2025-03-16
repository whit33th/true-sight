"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface RatingDropdownProps {
  initialRating?: string;
  onChange?: (rating: string) => void;
}

const RANKS = [
  "Challenger",
  "Grandmaster",
  "Master",
  "Diamond",
  "Platinum",
  "Gold",
  "Silver",
  "Bronze",
  "Iron",
];

export default function RatingDropdown({
  initialRating = "Diamond",
  onChange,
}: RatingDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(initialRating);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectRating = (rating: string) => {
    setSelectedRating(rating);
    if (onChange) {
      onChange(rating);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-1 rounded-sm bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600 hover:bg-neutral-300"
      >
        <Image
          src={`/icons/ranks/${selectedRating.toLowerCase()}.webp`}
          alt={`${selectedRating} rank`}
          width={20}
          height={20}
          className="aspect-square object-contain"
        />
        <span>{selectedRating}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-36 flex-col rounded-sm border border-neutral-300/80 bg-white shadow-sm">
          {RANKS.map((rank) => (
            <button
              key={rank}
              className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs text-neutral-950 hover:bg-neutral-100 ${
                selectedRating === rank ? "bg-neutral-100" : ""
              }`}
              onClick={() => handleSelectRating(rank)}
            >
              <Image
                src={`/icons/ranks/${rank.toLowerCase()}.webp`}
                alt={`${rank} rank`}
                width={26}
                height={26}
                className="aspect-square object-contain"
              />
              <span>{rank}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
